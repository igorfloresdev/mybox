const Card = ({title, text, button, children, action}) => {
  return (
    <div className="card card-side bg-base-300 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{text}</p>
        {children}
        <div className="card-actions justify-end">
          <button onClick={action} className="btn btn-primary">{button}</button>
        </div>
      </div>
    </div>
  )
}

export default Card