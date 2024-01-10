import Input  from '../components/Input';
import Paraph from '../components/Paraph';
import Button from '../components/Button';
import {useFormik } from 'formik';
import * as yup from 'yup';
import Card from '../components/Card';
import { useState } from 'react';

interface FormProps{
    fullname: string;
    email: string;
    date: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    username: string;
    password: string;
}

const HomeContainer = () => {

    const [step, setStep] = useState<number>(1);

    const handleNext = () => {
        if(step === 3){
            return
        }
        setStep((prevState) => prevState + 1)
    }

    const handlePrev = () => {
        if(step === 1){
            return
        }
        setStep((prevState) => prevState -1)
    }

    const formMik = useFormik({
        initialValues:{
            fullname: "",
            email: "",
            date: "",
            address:"",
            city:"",
            state:"",
            zipcode:"",
            username:"",
            password:""
        },
        onSubmit: (values: FormProps) => console.log(values),
        validationSchema: yup.object({
            fullname: yup.string().required(),
            email: yup.string().email().required(),
            date: yup.date().nullable().required('Date is required'),
            address: yup.string().required(),
            city: yup.string().required(),
            state: yup.string().required(),
            zipcode: yup.string().matches(/^\d{5}$/, 'Must valid 5-digit Code')
            .required('Zip Code is required'),
            username: yup.string().required(),
            password: yup.string().min(8, 'Password min 8 characters')
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d@$!%*#?&]+$/,
              'Password too weak'
            )
            .required('Password is required')
        })
    });

    return(
        <Card border>
          <form onSubmit={formMik.handleSubmit}>
            {step === 1 &&(
                <div>
                    <div>
                        <Paraph>{"Name"}</Paraph>
                        <Input type={"text"} className ="block border-neutral-400 border"
                            name={"name"}
                            value={formMik.values.fullname}
                            onChange={formMik.handleChange("fullname")}
                        />
                        {
                            formMik.errors.fullname && (
                                <Paraph>{formMik.errors.fullname}</Paraph>
                            )
                        }
                    </div>
                    <div>
                        <Paraph>{"Email Address"}</Paraph>
                        <Input type={"email"}  className ="block border-neutral-400 border"
                        name={"email"}
                        value={formMik.values.email}
                        onChange={formMik.handleChange("email")}
                        />

                        {
                            formMik.errors.email && (
                                <Paraph>{formMik.errors.email}</Paraph>
                            )
                        }
                    </div>

                    <div>
                        <Paraph>{"Date of Birth"}</Paraph>
                        <Input type={"date"}  className ="block border-neutral-400 border"
                        name={"date"}
                        value={formMik.values.date}
                        onChange={formMik.handleChange("date")}
                        />
                        {
                            formMik.errors.date && (
                                <Paraph>{formMik.errors.date}</Paraph>
                            )
                        }
                    </div>

                    <Button label={"Previous"} type={"button"} onClick={handlePrev}/>
                    <Button label={"Next"} type={"button"} onClick={handleNext}/>

                </div>



            )}
            {step === 2 &&(
                <div>
                    <div>
                        <Paraph>{"Street Address"}</Paraph>
                        <Input type={"text"} className ="block border-neutral-400 border"
                            name={"address"}
                            value={formMik.values.address}
                            onChange={formMik.handleChange("address")}
                        />
                        {
                            formMik.errors.address && (
                                <Paraph>{formMik.errors.address}</Paraph>
                            )
                        }

                    </div>

                    <div>
                        <Paraph>{"City"}</Paraph>
                        <Input type={"text"} className ="block border-neutral-400 border"
                            name={"city"}
                            value={formMik.values.city}
                            onChange={formMik.handleChange("city")}
                        />
                        {
                            formMik.errors.city && (
                                <Paraph>{formMik.errors.city}</Paraph>
                            )
                        }

                    </div>

                    <div>
                        <Paraph>{"State"}</Paraph>
                        <Input type={"text"} className ="block border-neutral-400 border"
                            name={"state"}
                            value={formMik.values.state}
                            onChange={formMik.handleChange("state")}
                        />
                        {
                            formMik.errors.state && (
                                <Paraph>{formMik.errors.state}</Paraph>
                            )
                        }

                    </div>

                    <div>
                        <Paraph>{"Zip Code"}</Paraph>
                        <Input type={"text"} className ="block border-neutral-400 border"
                            name={"zipcode"}
                            value={formMik.values.zipcode}
                            onChange={formMik.handleChange("zipcode")}
                        />
                        {
                            formMik.errors.zipcode && (
                                <Paraph>{formMik.errors.zipcode}</Paraph>
                            )
                        }
                    </div>

                    <Button label={"Previous"} type={"button"} onClick={handlePrev}/>
                    <Button label={"Next"} type={"button"} onClick={handleNext}/>
                </div>
            )}
            {step === 3 && (
                <div>
                    <div>
                        <Paraph>{"Username"}</Paraph>
                        <Input type={"text"} className ="block border-neutral-400 border"
                            name={"username"}
                            value={formMik.values.username}
                            onChange={formMik.handleChange("username")}
                        />
                        {
                            formMik.errors.username && (
                                <Paraph>{formMik.errors.username}</Paraph>
                            )
                        }

                    </div>

                    <div className='mb-4'>
                        <Paraph>{"Password"}</Paraph>
                        <Input type={"password"} className ="block border-neutral-400 border"
                            name={"password"}
                            value={formMik.values.password}
                            onChange={formMik.handleChange("password")}
                        />
                        {
                            formMik.errors.password && (
                                <Paraph>{formMik.errors.password}</Paraph>
                            )
                        }

                    </div>

                    <Button label={"Previous"} type={"button"} onClick={handlePrev}/>
                    <Button label={"Submit"} type={"submit"}/>

                </div>
            )}

            </form>

        </Card>

    )
}

export default HomeContainer
