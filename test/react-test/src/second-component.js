export default function SecondComponent(props) {
    const { typeArray } = props;
    return (
        <div className="aside-box aside-type">
            <p>Property type</p>
            <form>
                {typeArray.map((type, ix) => {
                    return (
                        <label key={ix}>
                            <input readOnly type="radio" value={type.name} name={type.name} checked={type.checked} />
                            {type.name}
                        </label>
                    )
                })}
            </form>
        </div>
    )
}