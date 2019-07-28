const {
  Command,
} = require('@oclif/command')
const fetch = require('node-fetch')
const {
  cli
} = require('cli-ux')
const Table = require('cli-table')
const moment = require('moment')

class SearchCommand extends Command {
  async run() {
    let value = await cli.prompt('Cryptomoneda a buscar')
    let change = await cli.prompt('Tipo de cambio (usd|eur)')

    cli.action.start('Buscando cryptomoneda...')
    let response = await fetch(`https://api.cryptonator.com/api/ticker/${value}-${change}`)
    const data = await response.json()
    cli.action.stop()

    if (data.success === true) {
      var table = new Table({
        head: ['Crypto', 'Moneda', 'Precio', 'Volumen', 'Change'],
      })
      table.push(
        [data.ticker.base, data.ticker.target, data.ticker.price, data.ticker.volume, data.ticker.change],
      )
      this.log(table.toString())
      this.log(moment(data.ticker.timestamp).format('DD/MM/YYYY hh:mm:ss a'))
    } else {
      this.error('cryptomoneda no encontrada')
    }
  }
}

SearchCommand.description = `Buscar valor de Cryptomonedas en dolares
`

module.exports = SearchCommand
