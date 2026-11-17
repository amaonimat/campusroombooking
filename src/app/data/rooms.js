export const rooms = [
  {
    id: "oak-101",
    name: "Oak Study Room",
    building: "Oak Library",
    floor: "1st floor",
    capacity: 4,
    type: "Quiet study",
    description:
      "A bright, tucked-away room for focused study sessions and small group work.",
    amenities: ["Whiteboard", "Power outlets", "Natural light"],
    color: "sage",
    icon: "book",
  },
  {
    id: "oak-204",
    name: "The Reading Room",
    building: "Oak Library",
    floor: "2nd floor",
    capacity: 6,
    type: "Group study",
    description:
      "A calm space with room to spread out your notes, laptops, and ideas.",
    amenities: ["Whiteboard", "Display screen", "Power outlets"],
    color: "butter",
    icon: "lamp",
  },
  {
    id: "innovation-310",
    name: "The Workshop",
    building: "Innovation Hall",
    floor: "3rd floor",
    capacity: 8,
    type: "Collaboration",
    description:
      "A flexible space for project teams, brainstorming, and presentations.",
    amenities: ["Display screen", "Whiteboard", "Video conferencing"],
    color: "blue",
    icon: "spark",
  },
  {
    id: "arts-112",
    name: "Studio Corner",
    building: "Arts Center",
    floor: "1st floor",
    capacity: 3,
    type: "Quiet study",
    description:
      "A cozy corner for independent work, sketching, and creative thinking.",
    amenities: ["Natural light", "Power outlets"],
    color: "rose",
    icon: "palette",
  },
  {
    id: "science-220",
    name: "The Lab Lounge",
    building: "Science Building",
    floor: "2nd floor",
    capacity: 6,
    type: "Group study",
    description:
      "A practical, comfortable spot for reviewing notes and meeting classmates.",
    amenities: ["Display screen", "Power outlets", "Whiteboard"],
    color: "sage",
    icon: "flask",
  },
  {
    id: "innovation-105",
    name: "The Green Room",
    building: "Innovation Hall",
    floor: "1st floor",
    capacity: 4,
    type: "Quiet study",
    description:
      "A peaceful room with a little extra breathing space between classes.",
    amenities: ["Natural light", "Power outlets", "Video conferencing"],
    color: "blue",
    icon: "leaf",
  },
  {
    id: "oak-315",
    name: "North Wing Room",
    building: "Oak Library",
    floor: "3rd floor",
    capacity: 10,
    type: "Collaboration",
    description:
      "A spacious meeting room for club planning and larger study groups.",
    amenities: ["Display screen", "Whiteboard", "Video conferencing"],
    color: "butter",
    icon: "people",
  },
  {
    id: "arts-204",
    name: "The Idea Room",
    building: "Arts Center",
    floor: "2nd floor",
    capacity: 5,
    type: "Collaboration",
    description:
      "A welcoming space to share ideas, review a draft, or plan what comes next.",
    amenities: ["Whiteboard", "Natural light", "Power outlets"],
    color: "rose",
    icon: "spark",
  },
];

export const roomTypes = ["All spaces", ...new Set(rooms.map((room) => room.type))];
export const buildings = ["All buildings", ...new Set(rooms.map((room) => room.building))];
