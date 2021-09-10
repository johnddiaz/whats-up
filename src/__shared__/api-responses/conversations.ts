export const john: Person = {
    id: 1,
    name: 'John Diaz',
}

export const squishy: Person = {
    id: 2,
    name: 'Squishy',
}

// eslint-disable-next-line
const billy: Person = {
    id: 3,
    name: 'Billy Bob',
}

export interface Person {
    id: number
    name: string
}

export interface Message {
    sender: number
    createdAt: string
    content: string
}

export interface Conversation {
    id: number
    participants: Person[]
    // Messages ordered from oldest to newest
    messages?: Message[]
}

// export const conversations: Conversation[] = [
//     {
//         id: 1,
//         participants: [squishy],
//         messages: [
//             {
//                 id: 1,
//                 senderId: squishy.id,
//                 senderName: squishy.name,
//                 text: 'This is a test message',
//             },
//             {
//                 id: 2,
//                 senderId: squishy.id,
//                 senderName: squishy.name,
//                 text:
//                     'This is a really really really really really longgggggggggggggggggggggggggg longgggggggggggggggggggggggggg longgggggggggggggggggggggggggg longgggggggggggggggggggggggggg https://goooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooogle.com test message',
//             },
//             {
//                 id: 3,
//                 senderId: john.id,
//                 senderName: john.name,
//                 text: `I know right?? Super duper long.`,
//             },
//             {
//                 id: 4,
//                 senderId: squishy.id,
//                 senderName: squishy.name,
//                 text: `Woowwww why don't I have a black color?`,
//             },
//             {
//                 id: 5,
//                 senderId: john.id,
//                 senderName: john.name,
//                 text: `Wait how did you know I have a black color, you can't see my screen... wait you should have a black color too!!`,
//             },
//             {
//                 id: 6,
//                 senderId: squishy.id,
//                 senderName: squishy.name,
//                 text: `Oh yeah, huh weieeeeeerd`,
//             },
//             {
//                 id: 7,
//                 senderId: squishy.id,
//                 senderName: squishy.name,
//                 text: `Most likely a bug then`,
//             },
//             {
//                 id: 8,
//                 senderId: squishy.id,
//                 senderName: squishy.name,
//                 text: `this John developer guy really sucks`,
//             },
//             {
//                 id: 9,
//                 senderId: john.id,
//                 senderName: john.name,
//                 text: `you criticizing me in third person??`,
//             },
//             {
//                 id: 10,
//                 senderId: squishy.id,
//                 senderName: squishy.name,
//                 text: `...`,
//             },
//             {
//                 id: 11,
//                 senderId: squishy.id,
//                 senderName: squishy.name,
//                 text: `.`,
//             },
//             {
//                 id: 12,
//                 senderId: squishy.id,
//                 senderName: squishy.name,
//                 text: `.`,
//             },
//             {
//                 id: 13,
//                 senderId: squishy.id,
//                 senderName: squishy.name,
//                 text: `.`,
//             },
//             {
//                 id: 14,
//                 senderId: john.id,
//                 senderName: john.name,
//                 text: `STOP IT`,
//             },
//             {
//                 id: 15,
//                 senderId: squishy.id,
//                 senderName: squishy.name,
//                 text: `TESTING OUT SINGLE CHARACTER INPUTS`,
//             },
//             {
//                 id: 16,
//                 senderId: squishy.id,
//                 senderName: squishy.name,
//                 text: `oops caps`,
//             },
//             {
//                 id: 17,
//                 senderId: squishy.id,
//                 senderName: squishy.name,
//                 text: `Oh and hopefully a scrollbar is appearing`,
//             },
//         ],
//     },
//     {
//         id: 2,
//         participants: [billy],
//     },
// ]
