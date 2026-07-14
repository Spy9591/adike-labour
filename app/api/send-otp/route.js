const sendOtp = async () => {
  if (!email || !phone) {
    alert("Enter Email and Mobile Number");
    return;
  }

  const phoneQuery = query(
    collection(db, "labours"),
    where("phone", "==", phone)
  );

  const phoneExists =
    await getDocs(phoneQuery);

  if (!phoneExists.empty) {
    alert(
      "Account already exists. Please Login or use Forgot Password."
    );

    setMode("login");

    return;
  }

  const emailQuery = query(
    collection(db, "labours"),
    where("email", "==", email)
  );

  const emailExists =
    await getDocs(emailQuery);

  if (!emailExists.empty) {
    alert(
      "Email already registered. Please Login or use Forgot Password."
    );

    setMode("login");

    return;
  }

  const newOtp = Math.floor(
    100000 +
      Math.random() * 900000
  ).toString();

  setGeneratedOtp(newOtp);

  await fetch("/api/send-otp", {
    method: "POST",

    headers: {
      "Content-Type":
        "application/json",
    },

    body: JSON.stringify({
      email,
      otp: newOtp,
    }),
  });

  alert("OTP Sent Successfully");
};
