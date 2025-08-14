import React from "react";
import {
  FaInbox,
  FaStar,
  FaTrash,
  FaPaperPlane,
  FaRegEdit,
  FaTag,
  FaRegFile,
  FaExclamationCircle

} from "react-icons/fa";

export const initialFolders = [
  { id: "inbox", name: "Inbox", icon: FaInbox },
  { id: "sent", name: "Sent mails", icon: FaPaperPlane },
  { id: "drafts", name: "Drafts", icon: FaRegEdit },
  { id: "trash", name: "Trash", icon: FaTrash },
  { id: "spam", name: "Spam", icon: FaExclamationCircle },
  { id: "starred", name: "Starred", icon: FaStar },
  { id: "documents", name: "Documents", icon: FaRegFile },
  { id: "primary", name: "Primary", icon: FaTag, isCategory: true },
  { id: "promotions", name: "Promotions", icon: FaTag, isCategory: true },
  { id: "other", name: "Other", icon: FaTag, isCategory: true },
];

const now = Date.now();

export const initialEmails = {
  e1: {
    id: "e1",
    folder: "inbox",
    category: "promotions",
    read: false,
    starred: false,
    labels: [],
    from: "Netflix",
    subject: "Your Netflix temporary access code",
    excerpt: "We received a request for a temporary access code from the device below.",
    timestamp: now - 1000 * 60 * 60 * 2,
    avatar: "N",
  },
  e2: {
    id: "e2",
    folder: "inbox",
    category: "other",
    read: false,
    starred: false,
    labels: [],
    from: "Pigtown Times",
    subject: "Twilight Thursday & August Long Weekend",
    excerpt: "Your guide to what's on in Limerick this week",
    timestamp: now - 1000 * 60 * 60 * 3,
    avatar: "📰",
  },
  e3: {
    id: "e3",
    folder: "inbox",
    category: "primary",
    read: true,
    starred: false,
    labels: ["Job Alerts"],
    from: "LinkedIn",
    subject: "New jobs similar to Staff Product Designer at TheyDo",
    excerpt: "Jobs similar to Staff Product Designer at TheyDo - Journey Management",
    timestamp: now - 1000 * 60 * 60 * 5,
    avatar: "in",
  },
  e4: {
    id: "e4",
    folder: "inbox",
    category: "promotions",
    read: false,
    starred: true,
    labels: ["Interviews"],
    from: "Today in Design",
    subject: "Brand Designs Worth Talking About",
    excerpt: "See how Bentley, Big Cartel, and others are using design to reinvent...",
    timestamp: now - 1000 * 60 * 60 * 8,
    avatar: "🎨",
  },
  e5: {
    id: "e5",
    folder: "inbox",
    category: "other",
    read: true,
    starred: false,
    labels: [],
    from: "Daft.ie Enquiry",
    subject: "Doman, Ashbourne Ave, South Circular Road, Co. Limerick",
    excerpt: "Your enquiry has been sent",
    timestamp: now - 1000 * 60 * 60 * 24 * 2,
    avatar: "🏠",
  },
};

export const defaultLabels = ["Job Alerts", "Interviews"];