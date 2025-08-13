export const seedFolders = [
  { id: "inbox", name: "Inbox", count: 20 },
  { id: "sent", name: "Sent mails" },
  { id: "drafts", name: "Drafts", count: 3 },
  { id: "trash", name: "Trash" },
  { id: "spam", name: "Spam" },
  { id: "starred", name: "Starred" },
  { id: "documents", name: "Documents" }
];

export const seedLabels = ["Job Alerts", "Interviews"];

export const seedPages = {
  inbox: [
    {
      id: "e1",
      sender: "LinkedIn",
      subject: "New jobs similar to Staff Product Designer at TheyDo",
      preview:
        "Jobs similar to Staff Product Designer at TheyDo - Journey Management",
      time: "11:15 AM",
      unread: false,
      starred: false,
      labels: []
    },
    {
      id: "e2",
      sender: "Pigtown Times",
      subject: "Twilight Thursday & August Long Weekend",
      preview: "Your guide to what’s on in Limerick this week",
      time: "1:00 PM",
      unread: true,
      starred: false,
      labels: ["Job Alerts"]
    },
    {
      id: "e3",
      sender: "Netflix",
      subject: "Your Netflix temporary access code",
      preview:
        "We received a request for a temporary access code from the device below.",
      time: "6:10 PM",
      unread: true,
      starred: false,
      labels: []
    },
    {
      id: "e4",
      sender: "Today in Design",
      subject: "Brand Designs Worth Talking About",
      preview:
        "See how Bentley, Big Cartel, and others are using design to reinvent...",
      time: "10:53 PM",
      unread: true,
      starred: false,
      labels: []
    },
    {
      id: "e5",
      sender: "Medium Weekly Digest",
      subject:
        "I’ll Instantly Know You Used Chat Gpt If I See This | Ossai Chinedum",
      preview: "Today’s Highlights",
      time: "Aug 1",
      unread: true,
      starred: false,
      labels: []
    },
    {
      id: "e6",
      sender: "Daft.ie Enquiry",
      subject: "Doman, Ashbourne Ave, South Circular Road, Co. Limerick",
      preview: "| Your Enquiry has been sent",
      time: "Jul 31",
      unread: false,
      starred: false,
      hasAttachment: true,
      labels: ["Interviews"]
    },
    {
      id: "e7",
      sender: "LinkedIn",
      subject: "You have 10+ new invitations",
      preview: "",
      time: "",
      unread: true,
      starred: false,
      labels: []
    }
  ],
  sent: [],
  drafts: [],
  trash: [],
  spam: [],
  documents: [],
  promotions: [
    {
      id: "p1",
      sender: "Figma",
      subject: "New templates to try this week",
      preview: "Work faster with these community favorites",
      time: "9:20 AM",
      unread: true,
      starred: false,
      labels: []
    }
  ],
  other: [
    {
      id: "o1",
      sender: "University of Limerick",
      subject: "Timetable update",
      preview: "Semester schedule changes for next week",
      time: "Yesterday",
      unread: true,
      starred: false,
      labels: []
    }
  ]
};