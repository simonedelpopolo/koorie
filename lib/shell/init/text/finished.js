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
    const cd_dir = bare === false ? `${'cd '.blue()}${directory}` : 'already in the project root directory.'
    const git_init = git === true ? 'git repository initialized' : 'git repository not initialized.'

    console.log( package_json )

    return `
${'# server set up & ready to go'.magenta().underline().strong()}

  ${cd_dir}
  
  ${git_init}
  
  ${'npm '.blue()}${'run '.red()}${'serve'}
`
}
