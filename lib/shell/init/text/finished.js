import { Blaze } from '@cli-blaze/decors'

/**
 * Text to be shown once installation has fined.
 *
 * @param {boolean} bare - bare option
 * @param {boolean} git - bare option
 * @param {Object} package_json - generated package.json
 * @param {string} directory - working dir
 * @returns {string}
 */
export function finished_text( bare, git, package_json, directory ){
    const cd_dir = bare === false ? `${Blaze.blue( 'cd ' )}${directory}` : 'already in the project root directory.'
    const git_init = git === true ? 'git repository initialized' : 'git repository not initialized.'

    console.log( package_json )

    return `
${Blaze.underline( Blaze.strong( Blaze.magenta( '# server set up & ready to go' ) ) )}

  ${cd_dir}
  
  ${git_init}
  
  ${Blaze.blue( 'npm ' )}${Blaze.red( 'run' )} serve
`
}
