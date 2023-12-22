import Queue from "bull";

interface smsData {
  phone: string;
  message: string;
}

export function sendSms(params: smsData) {
  const queue = new Queue("sms", process.env.REDIS_URL);

  queue.process(async (job) => {
    setTimeout(() => {
      console.log("enviando sms");
    }, 5000);
  });

  queue.add(params);
}
