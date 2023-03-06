const makeName = (name, to) => { return String([name, to].sort().join('_')); };

const Subscription = {
  message: {
    subscribe: (parent, { from, to }, { pubsub }) => {
      console.log(from, to, pubsub)
      const chatBoxName = makeName(from, to);
      return pubsub.subscribe(`chatBox ${chatBoxName}`);
    }
  }
};

export { Subscription as default };
