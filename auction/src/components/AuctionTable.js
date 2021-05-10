export default function AuctionTable({
  title,
  highestBid,
  highestBidderName,
  expiryDate,
}) {
    const humanReadableDate = new Date(expiryDate.seconds * 1000).toLocaleDateString(
        "Hu-hu"
      )
  return (
  <tr>
      <td>{title}</td>
      <td>{highestBid}</td>
      <td>{highestBidderName}</td>
      <td>{humanReadableDate}</td>
  </tr>
  );
}
