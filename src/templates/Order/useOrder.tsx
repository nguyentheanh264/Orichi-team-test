import { useState } from "react";
import { useForm } from "react-hook-form";
import { successMsg } from "../../helper/message";
import { dataSteps } from "../configs/constants";
import { RequestBodyOrder } from "./type";

export const useOrder = () => {
  const [activeStep, setActiveStep] = useState(1);
  const methodForm = useForm<RequestBodyOrder>({
    mode: "onTouched",
    defaultValues: {
      mealCategory: null,
      noOfPeople: 1,
      restaurant: null,
      dishesConfig: [{ dish: null, no: 1 }],
    },
  });

  const { handleSubmit, setError } = methodForm;

  const onSubmit = handleSubmit((data) => {
    const totalNumberOfDishes = data.dishesConfig.reduce(
      (currentValue, dishes) => Number(currentValue) + Number(dishes?.no),
      0
    );
    if (activeStep < dataSteps.length) {
      if (activeStep === 3) {
        if (totalNumberOfDishes > 10) {
          setError("root", {
            message: `Maximum 10 dishes`,
          });
        } else if (totalNumberOfDishes < data?.noOfPeople) {
          setError("root", {
            message: `The total number of dishes should be greater or equal to the number of people (${data?.noOfPeople})`,
          });
        } else {
          setActiveStep((step) => step + 1);
        }
      } else {
        setActiveStep((step) => step + 1);
      }
    } else {
      // submit step review
      successMsg("Submit coming soon...!");
      console.log("_______ data _______", data);
    }
  });
  return [
    { methodForm, activeStep },
    { setActiveStep, onSubmit },
  ] as const;
};
