import benReillyArtwork from "../assets/characters/ben-reilly.png";
import gwenArtwork from "../assets/characters/gwen.png";
import hobieArtwork from "../assets/characters/hobie.png";
import jessicaArtwork from "../assets/characters/jessica.png";
import miguelArtwork from "../assets/characters/miguel.png";
import milesArtwork from "../assets/characters/miles.png";
import noirArtwork from "../assets/characters/noir.png";
import pavitrArtwork from "../assets/characters/pavitr.png";
import peniArtwork from "../assets/characters/peni-p.png";
import peterBArtwork from "../assets/characters/peter-b.png";
import spiderCatArtwork from "../assets/characters/spider-cat.png";
import spiderHamArtwork from "../assets/characters/spider-ham.png";

export interface SpiderFact {
	label: string;
	value: string;
}

export interface SpiderPerson {
	slug: string;
	name: string;
	spiderName: string;
	earth: string;
	note: string;
	principle: string;
	image: string;
	imageAlt: string;
	imageStyle: "cutout" | "poster";
	imagePosition: string;
	color: string;
	secondary: string;
	intro: string;
	description: string;
	facts: readonly SpiderFact[];
	artworkSource: string;
}

export const spiderPeople = [
	{
		slug: "miles-morales",
		name: "Miles Morales",
		spiderName: "Spider-Man",
		earth: "Earth–1610B",
		note: "Brooklyn’s Spider-Man, finding a way to protect his world without losing his own voice.",
		principle: "Miles",
		image: milesArtwork,
		imageAlt: "Miles Morales in his black-and-red Spider-Man suit",
		imageStyle: "cutout",
		imagePosition: "50% 100%",
		color: "#f20d3a",
		secondary: "#18d8ff",
		intro:
			"The kid who was never supposed to be Spider-Man—and becomes one on his own terms.",
		description:
			"Miles starts as a student caught between expectations at home, school and inside his own head. The first film turns his uncertainty into motion: awkward poses, unfinished animation and a suit that does not fit yet. By the time he takes his leap, the visual language finally moves at his speed. Across the Spider-Verse tests that confidence against a whole institution. Miles is no longer asking whether he belongs. He is asking why belonging should require him to accept somebody else’s version of the story.",
		facts: [
			{ label: "First seen", value: "Into the Spider-Verse" },
			{ label: "Home", value: "Brooklyn, New York" },
			{ label: "Signature", value: "Venom strike and camouflage" },
		],
		artworkSource:
			"https://www.deviantart.com/metropolis-hero1125/art/Across-the-Spider-Verse-Miles-Morales-PNG-966270285",
	},
	{
		slug: "gwen-stacy",
		name: "Gwen Stacy",
		spiderName: "Spider-Woman",
		earth: "Earth–65B",
		note: "A drummer and Spider-Woman whose guarded independence is tested by friendship and family.",
		principle: "Gwen",
		image: gwenArtwork,
		imageAlt: "Gwen Stacy in her white, black and pink Spider-Woman suit",
		imageStyle: "cutout",
		imagePosition: "50% 100%",
		color: "#ff83c8",
		secondary: "#58dff5",
		intro:
			"A hero who learned to work alone, then discovers that isolation has its own cost.",
		description:
			"Gwen moves with the control of a drummer: precise, fast and seemingly effortless. Underneath that control is a fear of getting close to anyone after losing her best friend. Her watercolor world makes those emotions visible, washing from cool blue into violent pink as the distance between Gwen and her father changes. Across the Spider-Verse places her between the Spider Society’s rules and the people those rules hurt. Her story becomes less about escaping a world and more about choosing the people she wants beside her.",
		facts: [
			{ label: "First seen", value: "Into the Spider-Verse" },
			{ label: "Home", value: "New York, Earth–65B" },
			{ label: "Outside the mask", value: "Drummer in The Mary Janes" },
		],
		artworkSource:
			"https://www.deviantart.com/captain-kingsman16/art/Into-the-Spider-Verse-Spider-Gwen-1-PNG-777765097",
	},
	{
		slug: "hobie-brown",
		name: "Hobie Brown",
		spiderName: "Spider-Punk",
		earth: "Earth–138",
		note: "A guitarist, anarchist and the Spider Society’s least cooperative member.",
		principle: "Hobie",
		image: hobieArtwork,
		imageAlt: "Hobie Brown as Spider-Punk with his guitar",
		imageStyle: "cutout",
		imagePosition: "50% 100%",
		color: "#f4ef45",
		secondary: "#f20d3a",
		intro:
			"He does not believe in consistency, authority or letting a friend face the system alone.",
		description:
			"Hobie enters the film like a moving collage: newsprint, photocopied textures, torn edges and colors that refuse to stay registered. The style is not decoration; it is his politics made visible. He reads the Spider Society faster than most of its members and quietly prepares Miles to get out. Hobie rarely announces what side he is on. He shows it through what he builds, what he breaks and who he helps when the rules close in.",
		facts: [
			{ label: "First seen", value: "Across the Spider-Verse" },
			{ label: "Home", value: "Earth–138" },
			{ label: "Signature", value: "Guitar, spikes and improvised tech" },
		],
		artworkSource:
			"https://www.deviantart.com/metropolis-hero1125/art/Across-the-Spider-Verse-Hobie-Brown-PNG-966270290",
	},
	{
		slug: "miguel-ohara",
		name: "Miguel O’Hara",
		spiderName: "Spider-Man 2099",
		earth: "Earth–928B",
		note: "The formidable founder of the Spider Society and guardian of its canon.",
		principle: "2099",
		image: miguelArtwork,
		imageAlt: "Miguel O’Hara in his blue-and-red Spider-Man 2099 suit",
		imageStyle: "cutout",
		imagePosition: "50% 100%",
		color: "#18d8ff",
		secondary: "#f20d3a",
		intro:
			"A Spider-Man trying to hold the multiverse together through discipline, surveillance and control.",
		description:
			"Miguel has built the Spider Society around a theory: every Spider-Person’s life follows fixed events, and disrupting those events risks entire worlds. His certainty comes from grief, which makes his position more than a cold calculation. The film frames him as both protector and obstacle—someone carrying an impossible responsibility who has stopped leaving room for another answer. Against Miles’s improvisation, Miguel represents the danger of turning a pattern into a law.",
		facts: [
			{ label: "First seen", value: "Into the Spider-Verse, post-credits" },
			{ label: "Base", value: "Nueva York, Earth–928B" },
			{ label: "Role", value: "Founder of the Spider Society" },
		],
		artworkSource:
			"https://www.deviantart.com/metropolis-hero1125/art/Across-the-Spider-Verse-Miguel-O-Hara-PNG-966270297",
	},
	{
		slug: "peter-b-parker",
		name: "Peter B. Parker",
		spiderName: "Spider-Man",
		earth: "Earth–616B",
		note: "Miles’s reluctant mentor, now returning to the multiverse with Mayday in tow.",
		principle: "Peter B.",
		image: peterBArtwork,
		imageAlt: "Peter B. Parker carrying his daughter Mayday",
		imageStyle: "cutout",
		imagePosition: "50% 100%",
		color: "#e83a34",
		secondary: "#58a9ff",
		intro:
			"A tired Spider-Man who helps Miles begin again—and finds a reason to begin again himself.",
		description:
			"Peter arrives in Miles’s world worn down by repetition, loss and the feeling that his best years are behind him. Mentoring Miles forces him back into the parts of the job that matter: patience, trust and showing up before you feel ready. In Across the Spider-Verse, Mayday is living proof that Peter chose to change his own future. That makes his place beside Miguel uneasy. He understands the comfort of a rule, but his life has already been improved by taking a chance the rule could not promise.",
		facts: [
			{ label: "First seen", value: "Into the Spider-Verse" },
			{ label: "Home", value: "Earth–616B" },
			{ label: "Family", value: "Mary Jane Parker and Mayday Parker" },
		],
		artworkSource:
			"https://www.vhv.rs/viewpic/TRJooiT_spider-man-into-the-spider-verse-costume-peter/",
	},
	{
		slug: "pavitr-prabhakar",
		name: "Pavitr Prabhakar",
		spiderName: "Spider-Man India",
		earth: "Earth–50101",
		note: "Mumbattan’s relentlessly upbeat Spider-Man, with excellent hair and a very busy day.",
		principle: "Pavitr",
		image: pavitrArtwork,
		imageAlt: "Pavitr Prabhakar as Spider-Man India",
		imageStyle: "cutout",
		imagePosition: "50% 100%",
		color: "#ff7a1a",
		secondary: "#1ed6d1",
		intro:
			"A confident local hero whose bright world becomes the first real test of Miles’s refusal to accept fate.",
		description:
			"Pavitr moves through Mumbattan with the joy of someone who has found a rhythm that works. He balances hero work, school, romance and chai without pretending any of it is a burden. That ease makes the disruption of his world land harder. When Miles intervenes in what the Society calls a canon event, Pavitr’s home becomes the argument at the center of the film: whether a person in danger is a life to save now or a necessary piece of a larger pattern.",
		facts: [
			{ label: "First seen", value: "Across the Spider-Verse" },
			{ label: "Home", value: "Mumbattan, Earth–50101" },
			{ label: "Signature", value: "Yo-yo web shooters and effortless hair" },
		],
		artworkSource: "https://www.spider-verse.jp/",
	},
	{
		slug: "jessica-drew",
		name: "Jessica Drew",
		spiderName: "Spider-Woman",
		earth: "Earth–404",
		note: "A motorcycle-riding Spider-Woman, mentor to Gwen and Miguel’s closest field leader.",
		principle: "Jess",
		image: jessicaArtwork,
		imageAlt: "Jessica Drew riding her motorcycle as Spider-Woman",
		imageStyle: "cutout",
		imagePosition: "50% 100%",
		color: "#ff4d2e",
		secondary: "#ffd33d",
		intro:
			"A composed field leader who can fight a Renaissance Vulture while expecting a child.",
		description:
			"Jessica enters Gwen’s world in complete control: fast, observant and generous enough to see potential in a teenager having the worst night of her life. Inside the Spider Society, she becomes the bridge between Gwen and Miguel. Her mentorship is real, but so is her loyalty to the organization’s mission. That tension gives her a sharper role than simple authority figure. She knows how much Gwen needs support, yet still believes the system is the safest way to provide it.",
		facts: [
			{ label: "First seen", value: "Across the Spider-Verse" },
			{ label: "Home", value: "Earth–404" },
			{ label: "Signature", value: "Motorcycle combat and tactical command" },
		],
		artworkSource: "https://www.spider-verse.jp/",
	},
	{
		slug: "ben-reilly",
		name: "Ben Reilly",
		spiderName: "Scarlet Spider",
		earth: "Earth–94",
		note: "A spectacularly intense Spider-Man clone who narrates every feeling like a memory.",
		principle: "Ben",
		image: benReillyArtwork,
		imageAlt: "Ben Reilly in the Scarlet Spider suit",
		imageStyle: "cutout",
		imagePosition: "50% 100%",
		color: "#ef232b",
		secondary: "#27a7ff",
		intro:
			"All the muscles, monologues and dramatic shadows of a nineties comic brought to life.",
		description:
			"Ben Reilly is the film’s affectionate parody of a particularly brooding era of Spider-Man comics. He poses before he speaks, describes the emotional subtext out loud and treats every corridor like the setting for a tragic flashback. Beneath the joke, he is still a capable member of the Spider Society and one of the Spiders sent after Miles. His heightened style adds another visual dialect to a film already overflowing with them.",
		facts: [
			{ label: "First seen", value: "Across the Spider-Verse" },
			{ label: "Home", value: "Earth–94" },
			{ label: "Signature", value: "Sleeveless hoodie and internal monologue" },
		],
		artworkSource: "https://www.spider-verse.jp/",
	},
	{
		slug: "spider-man-noir",
		name: "Peter Parker",
		spiderName: "Spider-Man Noir",
		earth: "Earth–90214",
		note: "A hard-boiled Spider-Man from 1933 who fights fascists and studies the mystery of color.",
		principle: "Noir",
		image: noirArtwork,
		imageAlt: "Spider-Man Noir in a black trench coat and fedora",
		imageStyle: "cutout",
		imagePosition: "50% 100%",
		color: "#d8d4c8",
		secondary: "#53515a",
		intro:
			"A monochrome detective dropped into a story with far more color than his universe can explain.",
		description:
			"Spider-Man Noir arrives with the cadence of a pulp radio drama and the moral clarity of someone used to punching Nazis. His universe is literally black and white, making ordinary objects like a Rubik’s Cube strange enough to become a private obsession. The joke never erases his competence. Noir is focused, fearless and immediately committed to getting the displaced Spider-People home—even if he cannot understand the colors along the way.",
		facts: [
			{ label: "First seen", value: "Into the Spider-Verse" },
			{ label: "Home", value: "New York, 1933" },
			{
				label: "Signature",
				value: "Organic webbing and hard-boiled deduction",
			},
		],
		artworkSource:
			"https://www.marvel.com/articles/movies/spider-man-into-the-spider-verse-character-posters",
	},
	{
		slug: "peni-parker",
		name: "Peni Parker",
		spiderName: "SP//dr",
		earth: "Earth–14512",
		note: "A young pilot psychically linked to the spider that powers her towering SP//dr suit.",
		principle: "Peni",
		image: peniArtwork,
		imageAlt: "Peni Parker with the SP//dr mech",
		imageStyle: "cutout",
		imagePosition: "50% 100%",
		color: "#f45474",
		secondary: "#54dff7",
		intro:
			"A student, pilot and partner to the radioactive spider at the heart of her biomechanical suit.",
		description:
			"Peni’s anime-influenced world brings another animation language into Miles’s basement team. She is the youngest member, but never treated as less capable; her bond with SP//dr makes her both pilot and emotional center of a two-part hero. The collider battle forces Peni through a painful loss, yet she stays in the fight and helps finish the mission. Her return in Across the Spider-Verse quietly shows that she found a way forward.",
		facts: [
			{ label: "First seen", value: "Into the Spider-Verse" },
			{ label: "Home", value: "Earth–14512" },
			{ label: "Signature", value: "Psychic link with SP//dr and its spider" },
		],
		artworkSource:
			"https://www.marvel.com/articles/movies/spider-man-into-the-spider-verse-character-posters",
	},
	{
		slug: "spider-ham",
		name: "Peter Porker",
		spiderName: "Spider-Ham",
		earth: "Earth–8311",
		note: "A cartoon pig with spider powers, oversized props and impeccable comic timing.",
		principle: "Ham",
		image: spiderHamArtwork,
		imageAlt: "Peter Porker as the cartoon hero Spider-Ham",
		imageStyle: "cutout",
		imagePosition: "50% 100%",
		color: "#f23a33",
		secondary: "#ffd83d",
		intro:
			"Proof that the laws of physics get much less strict in the right corner of the multiverse.",
		description:
			"Spider-Ham runs on classic cartoon logic. He can produce a giant mallet from nowhere, flatten into impossible shapes and turn danger into a punchline without ever becoming useless to the team. That elasticity makes him funny, but his final advice to Miles is completely sincere: fear does not disappear before the leap. Like every Spider-Person, he carries loss behind the jokes and chooses to keep moving anyway.",
		facts: [
			{ label: "First seen", value: "Into the Spider-Verse" },
			{ label: "Home", value: "Earth–8311" },
			{ label: "Signature", value: "Toon physics and an enormous mallet" },
		],
		artworkSource:
			"https://www.marvel.com/articles/movies/spider-man-into-the-spider-verse-character-posters",
	},
	{
		slug: "spider-cat",
		name: "Spider-Cat",
		spiderName: "Spider-Cat",
		earth: "Earth–999",
		note: "A masked feline Spider-Society member whose webbing arrives like a hairball.",
		principle: "Cat",
		image: spiderCatArtwork,
		imageAlt: "Spider-Cat wearing a red-and-blue Spider-Man suit",
		imageStyle: "cutout",
		imagePosition: "50% 100%",
		color: "#f06b35",
		secondary: "#8f64ff",
		intro:
			"A tiny reminder that the Spider Society’s membership is considerably broader than people.",
		description:
			"Spider-Cat is a brief but unforgettable piece of the chase through the Spider Society headquarters. The film gives the feline variant exactly the gag it needs: a web-ball coughed up with all the ceremony of an ordinary hairball. The appearance lasts seconds, but it sells the scale of the multiverse better than another crowd of conventional Spider-Men could. Somewhere in the Society, even the cats have watches and a mission.",
		facts: [
			{ label: "First seen", value: "Across the Spider-Verse" },
			{ label: "Home", value: "Earth–999" },
			{ label: "Signature", value: "Feline agility and web-ball hairballs" },
		],
		artworkSource:
			"https://www.beyazperde.com/galerileri/filmler/galerileri-1000026546/",
	},
] as const satisfies readonly SpiderPerson[];

export function findSpiderPersonBySlug(
	slug: string | undefined,
): SpiderPerson | undefined {
	return spiderPeople.find((person) => person.slug === slug);
}
