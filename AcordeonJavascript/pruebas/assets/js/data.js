const data = [
  {
    Title: "Padre 1",
    IdPrincipal: 1,
    Enlace: "#",
    IdPadre: null,
    item: "1.",
  },
  {
    Title: "Padre 2",
    IdPrincipal: 2,
    Enlace: "#",
    IdPadre: null,
    item: "2.",
  },
  {
    Title: "Hijo del Padre 1",
    IdPrincipal: 3,
    Enlace: "#",
    IdPadre: 1,
    item: "1.1",
  },
  {
    Title: "Hijo del Padre 1",
    IdPrincipal: 4,
    Enlace: "#",
    IdPadre: 1,
    item: "1.2",
  },
  {
    Title: "Hijo del Padre 2",
    IdPrincipal: 5,
    Enlace: "#",
    IdPadre: 2,
    item: "2.1",
  },
  {
    Title: "Hijo del Padre 2",
    IdPrincipal: 6,
    Enlace: "#",
    IdPadre: 2,
    item: "2.2",
  },
  {
    Title: "Hijo del Hijo 2",
    IdPrincipal: 7,
    Enlace: "#",
    IdPadre: 6,
    item: "2.2.1",
  },
  {
    Title: "Hijo del padre 1",
    IdPrincipal: 8,
    Enlace: "#",
    IdPadre: 1,
    item: "1.3",
  },
];

export default data;
