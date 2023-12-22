import Queue from "bull";

interface emailData {
  email: string;
  subject: string;
  template: string;
  context: any;
}

export function sendEmail(params: emailData) {
  const queue = new Queue("email", process.env.REDIS_URL);

  queue.process(async (job) => {
    setTimeout(() => {
      console.log("enviando email");
    }, 5000);
  });

  queue.add(params);
}
