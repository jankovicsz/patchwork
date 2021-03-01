export default function ThirdComponent(props) {
    const { hotellist } = props;
    return (
        <>
            {hotellist.map((hotel, ix) => {
                return (
                    <div key={ix} className="box">
                        <h4>{hotel.name}</h4>
                        <img src={hotel.imageURL} alt="hotel" />
                        <p>{hotel.description}</p>
                        <button type="button">Book Now!</button>
                    </div>
                )
            })}
        </>
    )
}