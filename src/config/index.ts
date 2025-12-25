const config = {
  baseUrl: import.meta.env.VITE_BASE_URL,
  admin_email: import.meta.env.VITE_ADMIN_EMAIL,
  admin_pass: import.meta.env.VITE_ADMIN_PASS,
  sender_email: import.meta.env.VITE_SENDER_EMAIL,
  sender_pass: import.meta.env.VITE_SENDER_PASS,
  receiver_email: import.meta.env.VITE_RECEIVER_EMAIL,
  receiver_pass: import.meta.env.VITE_RECEIVER_PASS,
  driver_email: import.meta.env.VITE_DRIVER_EMAIL,
  driver_pass: import.meta.env.VITE_DRIVER_PASS,
};

export default config;