'use client'
import axios from 'axios'
import Papa from 'papaparse'
import { useState } from 'react'
import ResponseLog from './ResponseLog'

const Upload = () => {
	const [CSVData, setCSVData] = useState([])
	const commonConfig = { delimiter: ',' }

	async function sendJsonToApi(jsonData) {
		const apiUrl = 'https://crudcrud.com/api/af1cfcc46c6e436296291d6d8f4efed5/test'
		// const apiUrl = '/api/test'
		const headers = {
			headers: {
				"Content-Type": "application/json",
			}
		}
		const response = await axios.post(apiUrl, jsonData, headers)
		console.log('sendJsonToApi', response) // log the response
		return response
	}

	const [responses, setResponses] = useState([])

	const logResponse = (response) => {
		setResponses((prevResponses) => [...prevResponses, response])
	}

	async function handleSubmit(e) {
		e.preventDefault()
		CSVData[0].map(async items => {
			console.log('items', items)
			const response = await sendJsonToApi(JSON.stringify(items))
			logResponse(response)
		})
	}

	return (
		<div>
			<form onSubmit={handleSubmit} className='flex'>
				<input
					className='relative m-0 block w-[50%] min-w-0 mr-2 flex-auto rounded border border-solid border-neutral-300 dark:border-neutral-600 bg-clip-padding py-[0.32rem] px-3 text-base font-normal text-neutral-700  transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 dark:file:bg-neutral-700 file:px-3 file:py-[0.32rem] file:text-neutral-700 dark:file:text-neutral-100 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none' 
					type="file" 
					accept=".csv,.xlsx,.xls" 
					id="myfile" 
					name="fileInput" 
					onChange={(e) => {
						const files = e.target.files
						if (files) {
							console.log(files[0])
							Papa.parse(files[0], {
								...commonConfig,
								header: true,
								skipEmptyLines: true,
								complete: function(results) {
									setCSVData([...CSVData, results.data])
								}}
							)
						}}} 
				/>
				<button 
					type="submit"	
					className='inline-block rounded bg-slate-300 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]'
				>Upload</button>
			</form>
			<ResponseLog responses={responses} />
		</div>
	)
}

export default Upload
