/**
 * Random properties values for package.json.
 *
 * @param {string} property - .
 * @returns {Promise<string> | {string}}
 */
export async function random_properties( property ){

    switch ( property ) {

        case 'cwd':

            return `${dictionary.adjectives[ generator( dictionary.adjectives ) ]}_${dictionary.nouns[ generator( dictionary.nouns ) ]}`

        case 'name':

            return `${dictionary.adjectives[ generator( dictionary.adjectives ) ]}_${dictionary.nouns[ generator( dictionary.nouns ) ]}`

        case 'author':

            return `${dictionary.names[ generator( dictionary.names ) ]}`

        case 'description':

            return `${dictionary.descriptions[ generator( dictionary.descriptions ) ]}`

        default:
            break
    }
}

/**
 * Basic random number selector for the dictionary entry selected.
 *
 * @param {string[]} dictionary_entry - .
 * @returns {number}
 */
function generator( dictionary_entry ){
    return Math.floor( Math.random() * ( ( dictionary_entry.length - 1 ) + 1 ) )
}

const dictionary = {
    descriptions: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'Duis imperdiet, lacus eget vehicula elementum, felis lectus feugiat ipsum, nec placerat turpis velit vel turpis.',
        'Where Is My Mind',
        'Discovery Nodes',
    ],
    adjectives : [
        'brave',
        'shy',
        'snaky',
        'great',
        'kind',
        'fantastic',
        'venomous',
    ],
    nouns: [
        'hero',
        'heroin',
        'tiger',
        'bird',
        'alien',
    ],
    names: [
        'Galileo Galilei',
        'Winston Churchill',
        'Cleopatra',
        'Giovanna d\'Arco',
    ]
}

