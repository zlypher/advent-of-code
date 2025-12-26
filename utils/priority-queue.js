// https://medium.com/@adityakashyap_36551/priority-queue-in-javascript-binary-heap-076d0d38703f
class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(node, priority) {
    var flag = false;
    for (let i = 0; i < this.values.length; i++) {
      if (this.values[i].priority > priority) {
        this.values.splice(i, 0, { node, priority });
        flag = true;
        break;
      }
    }
    if (!flag) {
      this.values.push({ node, priority });
    }
  }

  dequeue() {
    return this.values.shift();
  }

  size() {
    return this.values.length;
  }
}

module.exports = {
  PriorityQueue,
};
