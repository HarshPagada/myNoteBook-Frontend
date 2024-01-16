import Notes from './Notes';


export default function Home(props) {
  const {ShowAlert} = props;

  const color={
    backgroundColor : 'burlywood',
}

    return (
        <div className='container' style={color}>
            <Notes ShowAlert={ShowAlert} />
        </div>
    )
}
