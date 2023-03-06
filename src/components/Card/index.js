const Card = ({title, text, button, children}) => {
  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{text}</p>
        {children}
        <div className="card-actions justify-end">
          <button className="btn btn-primary">{button}</button>
        </div>
      </div>
    </div>
  )
}

export default Card