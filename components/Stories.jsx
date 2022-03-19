import StoryCard from "./StoryCard";

const stories = [
  {
    name: "hecker",
    src: "https://pbs.twimg.com/media/FOK8NATXoAAaKvA?format=jpg&name=large",
    profile:
      "https://pbs.twimg.com/profile_images/1476564746157572102/BouxYxck_400x400.jpg",
  },
  {
    name: "Elon Musk",
    src: "https://links.papareact.com/4zn",
    profile: "https://links.papareact.com/kxk",
  },
  {
    name: "Jeff Bezos",
    src: "https://links.papareact.com/k2j",
    profile: "https://links.papareact.com/f0p",
  },
  {
    name: "Mark Zuckerberg",
    src: "data:image/jpeg;base64,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",
    profile: "https://links.papareact.com/snf",
  },
  {
    name: "Bill Gates",
    src: "https://links.papareact.com/4u4",
    profile: "https://links.papareact.com/zvy",
  },
];

function Stories(props) {
  return (
    <div className="flex justify-center space-x-3 mx-auto">
      {stories.map((story, index) => (
        <StoryCard
          key={index}
          name={story.name}
          src={story.src}
          profile={story.profile}
        />
      ))}
    </div>
  );
}

export default Stories;