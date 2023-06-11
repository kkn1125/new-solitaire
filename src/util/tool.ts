export const format = (time: Date | number | string, form: string) => {
  const timestamp = new Date(time);
  const year = timestamp.getFullYear();
  const month = timestamp.getMonth();
  const date = timestamp.getDate();
  const hour = timestamp.getHours();
  const minute = timestamp.getMinutes();
  const second = timestamp.getSeconds();
  const millisecond = timestamp.getMilliseconds();
  const isOver12 = hour > 12;

  return form.replace(/YYYY|MM|dd|HH|mm|ss|SSS|AP/g, ($1) => {
    switch ($1) {
      case "YYYY":
        return year.toString().padStart(4, "0");
      case "MM":
        return month.toString().padStart(2, "0");
      case "dd":
        return date.toString().padStart(2, "0");
      case "HH":
        return hour.toString().padStart(2, "0");
      case "mm":
        return minute.toString().padStart(2, "0");
      case "ss":
        return second.toString().padStart(2, "0");
      case "SSS":
        return millisecond.toString().padStart(3, "0");
      case "AP":
        return isOver12 ? "PM" : "AM";
      default:
        return $1;
    }
  });
};

export const formatFromCountdown = (countdown: number) => {
  // const hour = Math.floor(countdown / 60 / 60 / 1000) % 60;
  // const minute = Math.floor((countdown / 60 / 1000) % 60);
  // const second = Math.floor((countdown / 1000) % 1000);
  // const milliSecond = (countdown * 100) % 1000;
  // return `${hour}:${minute}:${second}.${milliSecond}`;
  const minute = Math.floor((countdown * 10) / 60) % 60;
  const second = Math.floor(countdown * 10) % 60;
  const milliSecond = Math.floor(countdown * 1000) % 100;

  return `${minute}:${second}.${milliSecond.toString().padStart(2, "0")}`;
};
