import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

interface FormDataI {
    title: string;
    description: string;
    uploadedBy: string;
}

/**
 * Render a UploadImageForm component.
 *
 * State: formData
 *          {
                title: '',
                description: '',
                uploaded_by: '',
            }
 * 
 *        errors: str (error message)
 *        selectedFile: file selected for upload (type:??)
 *
 * Props: onSubmit (callback function)
 *
 * App -> RoutesList -> UploadImageForm
 *
 */

function UploadImageForm({ onSubmit }: { onSubmit: Function }) {
    const [formData, setFormData] = useState<FormDataI>(
        {
            title: '',
            description: '',
            uploadedBy: ''
        }
    );

    const [selectedFile, setSelectedFile] = useState<File|''>('');
    const [errors, setErrors] = useState();

    const navigate = useNavigate();
    //console.log("what is errors", errors);
    console.log("what is formData>>>>>>", formData);

    function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = evt.target;
        //console.log(name, value);
        setFormData((fData) => ({
            ...fData,
            [name]: value,
        }));
    }

    function handleFileSelect(evt:React.ChangeEvent<HTMLInputElement>){
        console.log("what is file stuff", evt.target.files)
        
        setSelectedFile(evt.target.files[0])
    }

    const formKeys:string[] = Object.keys(formData);
    const isDisabled = formKeys.some(key => formData[key as keyof FormDataI] === '')

    /**
     * Waits for a successful formData submission and then navigates to '/'
     * or catches a database request error and set the state of setErrors
     * for informational display purposes. 
     */
    async function handleSubmit(evt: React.FormEvent) {
        evt.preventDefault();
        try {
            const result = await onSubmit(formData, selectedFile);
            navigate('/');
            console.log("success, result is", result);
        }
        catch (err:any) {

            //console.log("err>>>>>>>>>>>>", err);
            setErrors(err.message)
        }
    }


    return (
        <section className='UploadImageForm'>
            <Card>
                <CardBody>

                    <label>
                        <CardText>
                            <b>Upload new image</b>
                        </CardText>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className='UploadImageForm-inputs'>
                                <label>
                                    Title:
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={handleChange}
                                        name="title"
                                    />
                                </label>

                                <label>
                                    Description:
                                    <input
                                        type="text"
                                        value={formData.description}
                                        onChange={handleChange}
                                        name="description"
                                    />
                                </label>

                                <label>
                                    Uploaded by:
                                    <input
                                        type="text"
                                        value={formData.uploadedBy}
                                        onChange={handleChange}
                                        name="uploadedBy"
                                    />
                                </label>

                                <label>
                                    Select file:
                                    <input
                                        type="file"
                                        onChange={handleFileSelect}
                                        name="myfile"
                                    />
                                </label>
                            </div>
                            <button disabled={isDisabled}>Submit!</button>
                        </form>
                    </label>
                    <p className='UploadImageForm-errors'>{errors}</p>

                </CardBody>
                <Link to="/">Back to home!</Link>
            </Card>
        </section>
    )
}

export default UploadImageForm;
