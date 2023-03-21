const ResponseLog = ({responses}) => {

  // console.log('ResponseLog', responses.data)

  return ( 
    <div className="mt-4 border-2 min-h-[250px] p-3">
      <h2>Response Log</h2>
      <ul>
        {responses.map((response, index) => (
          <>
            {console.log(`ResponseLog`, response)}
            <li key={index}><strong>Response:</strong> Name: {response.data.name}, Status: {response.statusText}</li>
          </>
        ))}
      </ul>
    </div>
   );
}
 
export default ResponseLog;