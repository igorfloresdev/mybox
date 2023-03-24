const Card = ({ title, text, button, children, action, className }) => {
  return (
    <div className={`card card-side bg-base-300 shadow-xl ${className}`}>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{text}</p>
        {children}
        <div className="card-actions justify-end">
          {button &&
            <button onClick={action} className="btn btn-primary">{button}</button>
          }
        </div>
      </div>
    </div>
  )
}

export default Card