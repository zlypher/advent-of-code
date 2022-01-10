// Day 16: Packet Decoder
const fs = require("fs");

const prepareInput = () => fs.readFileSync("./input.txt").toString();

const input = prepareInput();

const decodeSingle = (char) => {
  switch (char) {
    case "0":
      return "0000";
    case "1":
      return "0001";
    case "2":
      return "0010";
    case "3":
      return "0011";
    case "4":
      return "0100";
    case "5":
      return "0101";
    case "6":
      return "0110";
    case "7":
      return "0111";
    case "8":
      return "1000";
    case "9":
      return "1001";
    case "A":
      return "1010";
    case "B":
      return "1011";
    case "C":
      return "1100";
    case "D":
      return "1101";
    case "E":
      return "1110";
    case "F":
      return "1111";
  }
};

const decode = (input) => {
  return input.split("").reduce((prev, curr) => {
    return prev + decodeSingle(curr);
  }, "");
};

const decodeLiteralPacketValue = (input) => {
  const numbers = [];
  const inputClone = [...input];
  let totalBits = 0;

  while (true) {
    const [prefix, ...num] = inputClone.splice(0, 5);

    totalBits += 5;
    numbers.push(...num);

    if (prefix === "0") {
      break;
    }
  }

  return {
    value: parseValue(numbers.join("")),
    bits: totalBits,
  };
};

const parseValue = (valStr) => parseInt(valStr, 2);

const decodeSubPacketsByLengthOrNum = (input, len, num) => {
  let totalBits = 0;
  let remainingLen = len;
  let remainingNum = num;
  let packets = [];

  while (remainingLen > 0 || remainingNum > 0) {
    const { packet, bits } = decodePacket(input);
    packets.push(packet);
    totalBits += bits;
    remainingLen -= bits;
    remainingNum -= 1;
    input = input.slice(bits);
  }

  return {
    packets,
    bits: totalBits,
  };
};

const decodeSubPackets = (input) => {
  const lengthTypeId = input[0];
  const lenOrNum = lengthTypeId === "0" ? 15 : 11;
  const lenOrNumInBits = input.slice(1, lenOrNum + 1);
  const subPacketsStr = input.slice(lenOrNum + 1);
  const lenOrNumParsed = parseValue(lenOrNumInBits);

  let packetInfo;
  if (lengthTypeId === "0") {
    packetInfo = decodeSubPacketsByLengthOrNum(
      subPacketsStr,
      lenOrNumParsed,
      -1
    );
  } else {
    packetInfo = decodeSubPacketsByLengthOrNum(
      subPacketsStr,
      -1,
      lenOrNumParsed
    );
  }

  return {
    ...packetInfo,
    bits: packetInfo.bits + lenOrNum + 1,
  };
};

const decodePacket = (input) => {
  const versionStr = input.slice(0, 3);
  const typeIdStr = input.slice(3, 6);

  const version = parseValue(versionStr);
  const typeId = parseValue(typeIdStr);

  let totalBits = 6;
  let literal = -1;
  let subPackets = [];
  if (typeId === 4) {
    const { value, bits } = decodeLiteralPacketValue(input.slice(6));
    literal = value;
    totalBits += bits;
  } else {
    const { packets, bits } = decodeSubPackets(input.slice(6));
    subPackets = packets;
    totalBits += bits;
  }

  let packet = {
    version,
    typeId,
    literal,
    subPackets,
  };

  return {
    packet: {
      ...packet,
    },
    bits: totalBits,
  };
};

const sumVersions = (packet) => {
  let sum = packet.version;

  return (
    sum +
    packet.subPackets.reduce((prev, curr) => {
      return prev + sumVersions(curr);
    }, 0)
  );
};

const evaluateExpression = (packet) => {
  if (packet.typeId === 4) {
    return packet.literal;
  }

  if (packet.typeId === 0) {
    return packet.subPackets.reduce((prev, curr) => {
      return prev + evaluateExpression(curr);
    }, 0);
  }

  if (packet.typeId === 1) {
    return packet.subPackets.reduce((prev, curr) => {
      return prev * evaluateExpression(curr);
    }, 1);
  }

  if (packet.typeId === 2) {
    return Math.min(...packet.subPackets.map((p) => evaluateExpression(p)));
  }
  if (packet.typeId === 3) {
    return Math.max(...packet.subPackets.map((p) => evaluateExpression(p)));
  }
  if (packet.typeId === 5) {
    return evaluateExpression(packet.subPackets[0]) >
      evaluateExpression(packet.subPackets[1])
      ? 1
      : 0;
  }
  if (packet.typeId === 6) {
    return evaluateExpression(packet.subPackets[0]) <
      evaluateExpression(packet.subPackets[1])
      ? 1
      : 0;
  }
  if (packet.typeId === 7) {
    return evaluateExpression(packet.subPackets[0]) ===
      evaluateExpression(packet.subPackets[1])
      ? 1
      : 0;
  }
};

function solvePartOne(input) {
  const decoded = decode(input);

  const { packet, bits } = decodePacket(decoded);
  const sumVersionNumbers = sumVersions(packet);
  return sumVersionNumbers;
}

// console.log(solvePartOne(input));

function solvePartTwo(input) {
  const decoded = decode(input);

  const { packet, bits } = decodePacket(decoded);
  console.log(packet);
  const result = evaluateExpression(packet);
  return result;
}

console.log(solvePartTwo(input));
