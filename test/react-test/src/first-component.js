export default function FirstComponent(props) {
    const { starArray } = props;
    return (
        <div className="aside-box aside-stars">
            <p>Star rating</p>
            <form>
                {starArray.map((star) => {
                    return (
                        <label key={star.name}>
                            <input
                            readOnly
                            type="radio"
                            value={star.name}
                            name={star.name}
                            checked={star.checked} />
                            {star.name}
                        </label>
                    )
                })}
            </form>
        </div>
    )
}