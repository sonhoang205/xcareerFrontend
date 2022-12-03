import axios from "axios";
import { useState, useEffect, useRef } from "react";

const cards = [
  {
    id: "card-1",
    title: "Learning how to cook",
  },
  {
    id: "card-2",
    title: "Making sandwich",
  },
  {
    id: "card-3",
    title: "Taking the trash out",
  },
];

const data = {
  lists: {
    "list-1": {
      id: "list-1",
      title: "To do",
      cards,
    },
    "list-2": {
      id: "list-2",
      title: "In progress",
      cards: [],
    },
    "list-3": {
      id: "list-2",
      title: "Done",
      cards: [],
    },
    "list-2": {
      id: "list-2",
      title: "More",
      cards: [],
    },
  },
  listIds: ["list-1", "list-2", "list-3", "list-4"],
};

export default data;
