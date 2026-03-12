import Toggle from "./Toggle";
import { useState } from "react";

function Agreements() {
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
  });

  const handleToggle = (value, name) => {
    setAgreements((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-4">
      <Toggle
        name="terms"
        label="Terms and Conditions"
        description="I agree to the platform's terms and conditions."
        checked={agreements.terms}
        onChange={handleToggle}
      />

      <Toggle
        name="privacy"
        label="Data Privacy Agreement"
        description="I consent to the processing of my personal data."
        checked={agreements.privacy}
        onChange={handleToggle}
      />
    </div>
  );
}

export default Agreements;
