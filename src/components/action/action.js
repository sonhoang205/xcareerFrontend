import axios from "axios";




export const InitialData = {
  boards: [
    {
      id: "Board-1",
      columnOrder: ["column-2", "column-3", "column-1"],
      columns: [
        {
          id: "column-1",
          boardId: "board-1",
          tittle: "to do list",
          cardOder: [
            "card-1",
            "card-2",
            "card-3",
            "card-4",
            "card-5",
            "card-6",
            "card-7",
          ],
          cards: [
            {
              id: "card-1",
              boardId: "board-1",
              columnId: "column-1",
              tittle: "tittle-card 1",
            },
            {
              id: "card-2",
              boardId: "board-1",
              columnId: "column-1",
              tittle: "tittle-card 2",
            },
            {
              id: "card-3",
              boardId: "board-1",
              columnId: "column-1",
              tittle: "tittle-card 3",
            },
            {
              id: "card-4",
              boardId: "board-1",
              columnId: "column-1",
              tittle: "tittle-card 4",
            },
            {
              id: "card-5",
              boardId: "board-1",
              columnId: "column-1",
              tittle: "tittle-card 5",
            },
            {
              id: "card-6",
              boardId: "board-1",
              columnId: "column-1",
              tittle: "tittle-card 6",
            },
            {
              id: "card-7",
              boardId: "board-1",
              columnId: "column-1",
              tittle: "tittle-card 7",
            },
            {
              id: "card-8",
              boardId: "board-1",
              columnId: "column-1",
              tittle: "tittle-card 8",
            },
            {
              id: "card-9",
              boardId: "board-1",
              columnId: "column-1",
              tittle: "tittle-card 9",
            },
          ],
        },
        {
          id: "column-2",
          boardId: "board-1",
          tittle: "Done",
          cardOder: ["card-7", "card-8", "card-9"],
          cards: [
            {
              id: "card-10",
              boardId: "board-1",
              columnId: "column-1",
              tittle: "tittle-card 10",
            },
            {
              id: "card-11",
              boardId: "board-1",
              columnId: "column-1",
              tittle: "tittle-card 11",
            },
            {
              id: "card-12",
              boardId: "board-1",
              columnId: "column-1",
              tittle: "tittle-card 12",
            },
          ],
        },
        {
          id: "column-3",
          boardId: "board-1",
          tittle: "in process",
          cardOder: ["card-10", "card-11", "card-12"],
          cards: [
            {
              id: "card-13",
              boardId: "board-1",
              columnId: "column-1",
              tittle: "tittle-card 13",
            },
            {
              id: "card-14",
              boardId: "board-1",
              columnId: "column-1",
              tittle: "tittle-card 14",
            },
            {
              id: "card-15",
              boardId: "board-1",
              columnId: "column-1",
              tittle: "tittle-card 15",
            },
          ],
        },
      ],
    },
    {
      id: "Board-2",
      columnOrder: ["column-1", "column-2", "column-3"],
      columns: [
        {
          id: "column-1",
          boardId: "board-2",
          tittle: " list",
          cardOder: [
            "card-1",
            "card-2",
            "card-3",
            "card-4",
            "card-5",
            "card-6",
            "card-7",
          ],
          cards: [
            {
              id: "card-1",
              boardId: "board-2",
              columnId: "column-1",
              tittle: "tittle-card 1",
            },
            {
              id: "card-2",
              boardId: "board-2",
              columnId: "column-1",
              tittle: "tittle-card 2",
            },
            {
              id: "card-3",
              boardId: "board-2",
              columnId: "column-1",
              tittle: "tittle-card 4",
            },
            {
              id: "card-4",
              boardId: "board-2",
              columnId: "column-1",
              tittle: "tittle-card 5",
            },
            {
              id: "card-5",
              boardId: "board-2",
              columnId: "column-1",
              tittle: "tittle-card 6",
            },
            {
              id: "card-6",
              boardId: "board-2",
              columnId: "column-1",
              tittle: "tittle-card 7",
            },
          ],
        },
      ],
    },
  ],
};
