export const Sbi = async (event, context) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "SBI encryption",
    }),
  };

  return response;
};
