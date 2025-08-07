/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { styles } from "../styles/styles";

const Policy = () => {
  return (
    <div className="w-[95%] 800px:w-[92%] m-auto py-2 text-black dark:text-white px-3">
      <h1 className={`${styles.title} !text-start pt-2`}>
        ELearning Platform Terms and Conditions
      </h1>

      <ul style={{ listStyle: "unset", marginLeft: "15px" }}>
        <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
          <strong>1. Account Registration</strong>
          <br />
          To access our courses, you must register for an account with accurate
          and complete information. You are responsible for maintaining the
          confidentiality of your login credentials and all activities that
          occur under your account.
        </p>

        <br />

        <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
          <strong>2. Course Access</strong>
          <br />
          Upon payment, you will receive immediate access to the purchased
          course materials. Access is granted for the duration specified at
          purchase (typically 12 months) unless otherwise stated. We reserve the
          right to modify or remove content at any time.
        </p>

        <br />

        <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
          <strong>3. Payment and Refunds</strong>
          <br />
          All payments are processed through secure gateways. We offer a 14-day
          money-back guarantee if you're unsatisfied with your purchase. Refund
          requests must be submitted through our support system before
          completing more than 20% of the course content.
        </p>

        <br />

        <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
          <strong>4. Intellectual Property</strong>
          <br />
          All course materials, including videos, text, and downloadable
          resources, are the property of ELearning and are protected by
          copyright laws. You may not redistribute, resell, or share these
          materials without explicit written permission.
        </p>

        <br />

        <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
          <strong>5. Code of Conduct</strong>
          <br />
          We maintain a respectful learning environment. Any abusive behavior,
          cheating, or sharing of solutions in our community forums may result
          in immediate account termination without refund.
        </p>
      </ul>
    </div>
  );
};

export default Policy;
