export const fadeXY = {
  hidden: {
    opacity: 0,
    x: -50,
    y: -50,
  },
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    x: 50,
    y: 50,
    transition: {
      duration: 0.3,
    },
  },
};
