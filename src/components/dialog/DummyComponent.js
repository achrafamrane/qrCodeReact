import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { useConfirm } from "./ConfirmService";

const DummyComponent = () => {
  const [value, setValue] = useState(null);
  const confirm = useConfirm();

  return (
    <>
      <h1>Action: {value}</h1>
      <Button
        primary
        onClick={() => {
          confirm({
            title: "Confirmation"
          })
            .then(() => {
              setValue("confirmed");
            })
            .catch(() => {
              setValue("cancelled");
            });
        }}
      >
        Save
      </Button>
    </>
  );
};

export default DummyComponent;
