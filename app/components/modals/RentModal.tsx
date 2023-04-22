"use client";

import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

import useRentModal from "@/app/hooks/useRentModal";

import Modal from "./Modal";
import Heading from "../Heading";

import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";

const StepsType = {
  CATEGORY: 0,
  LOCATION: 1,
  INFO: 2,
  IMAGE: 3,
  DESCRIPTION: 4,
  PRICE: 5,
} as const;

const RentModal = () => {
  const rentModal = useRentModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number>(StepsType.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep(step - 1);
  };

  const onNext = () => {
    setStep(step + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if(step !== StepsType.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    axios.post("/api/listings", data)
    .then(() => {
      toast.success("Listing created!");
      router.refresh();
      reset();
      setStep(StepsType.CATEGORY);
      rentModal.onClose(); 
    })
    .catch(() => {
      toast.error("Something went wrong")
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  const actionLabel = useMemo(() => {
    if (step === StepsType.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === StepsType.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-3">
      <Heading
        title="Which of this best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div className="col-span-1" key={item.label}>
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === StepsType.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />

        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />

        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === StepsType.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <Counter
          onChange={(value) => setCustomValue("guestCount", value)}
          value={guestCount}
          title="Guests"
          subtitle="How many guests do you allow?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("roomCount", value)}
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms do you have?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("bathroomCount", value)}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
        />
      </div>
    );
  }

if (step === StepsType.IMAGE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="This will be the first thing guests see"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === StepsType.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet is best!"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === StepsType.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you want to charge?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          register={register}
          disabled={isLoading}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === StepsType.CATEGORY ? undefined : onBack}
      title="Airbnb your home"
      body={bodyContent}
    />
  );
};

export default RentModal;
