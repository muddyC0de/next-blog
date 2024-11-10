import SimpleMDE from "easymde";

export const toolbar = [
  {
    name: "bold",
    action: SimpleMDE.toggleBold,
    className: "fa-solid fa-bold",
    title: "Bold",
  },
  {
    name: "italic",
    action: SimpleMDE.toggleItalic,
    className: "fa-solid fa-italic",
    title: "Italic",
  },
  {
    name: "link",
    action: SimpleMDE.drawLink,
    className: "fa-solid fa-link",
    title: "Create Link",
  },
  {
    name: "ordered-list",
    action: SimpleMDE.toggleOrderedList,
    className: "fa-solid fa-list-ol",
    title: "Ordered List",
  },
  {
    name: "unordered-list",
    action: SimpleMDE.toggleUnorderedList,
    className: "fa-solid fa-list",
    title: "Unordered List",
  },
  {
    name: "heading",
    action: SimpleMDE.toggleHeading1,
    className: "fa-solid fa-heading",
    title: "Heading",
  },
  {
    name: "quote",
    action: SimpleMDE.toggleBlockquote,
    className: "fa-solid fa-quote-left",
    title: "Quote",
  },

  {
    name: "code-block",
    action: SimpleMDE.toggleCodeBlock,
    className: "fa-solid fa-code",
    title: "Code Block",
  },
  {
    name: "image",
    action: SimpleMDE.drawImage,
    className: "fa-solid fa-image",
    title: "Upload Image",
  },
];

export const autofocusNoSpellcheckerOptions = {
  toolbar,
  autofocus: true,
  autosave: {
    enabled: true,
    delay: 1000,
    uniqueId: "edit-post",
  },
  status: false,
  spellChecker: false,
  blockStyles: {
    italic: "_",
  },
  unorderedListStyle: "-",
  hideIcons: ["guide", "side-by-side", "fullscreen"],
} as SimpleMDE.Options;
