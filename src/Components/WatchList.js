import React from 'react'

const WatchList = () => {
  return (
    <div>
      <h3>WatchList</h3>
      <div style={{ 'display': 'flex', 'justifyContent': 'center' }}>
        <table>
          <tr>
            <th>Item</th>
            <th>Buy</th>
            <th>Sell</th>
            <th>Date Added</th>
          </tr>
          <tr>
            <td>Whip</td>
            <td>137645</td>
            <td>123485</td>
            <td>9/2/2022</td>
          </tr>
          <tr>
            <td>Air Rune</td>
            <td>5</td>
            <td>4</td>
            <td>9/2/2022</td>
          </tr>
        </table>
      </div>

    </div>
  )
}

export default WatchList