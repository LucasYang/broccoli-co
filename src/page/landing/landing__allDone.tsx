import React from "react";
import styles from "./landing__allDone.module.css";
import formStyles from "./landing__form.module.css";
import Button from "../../components/Button";

interface AllDoneInterface {
  onConfirm: (e: React.MouseEvent<HTMLElement>) => void;
}

export function AllDone({ onConfirm }: AllDoneInterface) {
  return (
    <div className={styles.allDoneContainer} data-testid="landing-alldone">
      <div className={formStyles.landingFormHeader}>
        <h1 className={formStyles.landingFormHeading}>All done!</h1>
        <hr className={formStyles.landingFormHR} />
      </div>
      <div className={styles.allDoneBody}>
        <p className={styles.allDoneParagraph}>
          You will be one of the first to experience
        </p>
        <p className={styles.allDoneParagraph}>
          Broccoli & Co. when we launch.
        </p>
      </div>
      <Button className={formStyles.landingFormButton} onClick={onConfirm}>
        <span>OK</span>
      </Button>
    </div>
  );
}

export default AllDone;
