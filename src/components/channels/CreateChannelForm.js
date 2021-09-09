import React, { useState } from 'react'
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import InputIcon from '@material-tailwind/react/InputIcon'
import Checkbox from '@material-tailwind/react/Checkbox'
import { useWindowWidth } from '@react-hook/window-size'
import { useFirebase } from 'react-redux-firebase';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const CreateChannelForm = ({ showModal, setShowModal }) => {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm()
    const firebase = useFirebase();
    const uid = useSelector(state => state.firebase.auth.uid)
    const profile = useSelector(state => state.firebase.profile)

    const [isPassword, setIsPassword] = useState(false)
    const windowSize = useWindowWidth()


    const onSubmit = (data, e) => {
        const { name, description, password } = data
        firebase.push("channels", {
            name,
            description,
            createdBy: {
                name: profile.name,
                avatar: profile.avatar,
                uid
            },
            channelPassword: isPassword ? password : "",
            icon: isPassword ? 'lock' : 'hashtag'
        })
        setShowModal(false)
        setValue("")

    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setValue(name, value)
    }

    return (
        <>
            {showModal && <Modal size={windowSize > 480 ? 'md' : 'sm'} active={showModal} toggler={() => setShowModal(false)}>
                <ModalHeader toggler={() => setShowModal(false)}>
                    Kanal Oluştur
                </ModalHeader>
                <ModalBody>
                    <p className="text-base leading-relaxed text-gray-600 dark:text-gray-500 font-normal mb-4">
                        Arkadaşlarınızla konuşabileceğiniz herkese açık veya şifreli kanallar oluşturabilirsiniz.Kanalı oluşturan kişiden başkası silemez!
                    </p>
                    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <InputIcon
                                style={{ backgroundColor: profile.theme === "light" ? '' : 'black' }}
                                name="name"
                                error={errors.name ? ' ' : ''}
                                {...register("name", { required: true, maxLength: 15 })}
                                onChange={handleChange}
                                size="regular"
                                outline={true}
                                color={errors.name ? 'red' : "lightBlue"}
                                placeholder="Kanal Adı(max-length:15)"
                                iconFamily="material-icons"
                                iconName="hashtag"
                            />
                        </div>
                        <div className="mb-4">
                            <InputIcon
                                style={{ backgroundColor: profile.theme === "light" ? '' : 'black' }}
                                name="description"
                                error={errors.description ? ' ' : ''}
                                {...register("description", { required: true })}
                                onChange={handleChange}
                                color={errors.description ? 'red' : "lightBlue"}
                                size="regular"
                                outline={true}
                                placeholder="Kanal Açıklama"
                                iconFamily="material-icons"
                                iconName="description"
                            />
                        </div>
                        <div className="mb-4">
                            <Checkbox
                                style={{ backgroundColor: profile.theme === "light" ? '' : 'black' }}
                                onChange={() => setIsPassword(!isPassword)}
                                name="checkPassword"
                                color="green"
                                text="Şifreli kanal oluştur"
                                id="parolaCheck"
                                checked={isPassword}
                                value={isPassword}
                            />
                        </div>
                        <div className={`mb-4 ${isPassword ? '' : 'hidden transition-all'}`}>
                            <InputIcon
                                style={{ backgroundColor: profile.theme === "light" ? '' : 'black' }}
                                name="password"
                                error={errors.password ? ' ' : ''}
                                {...register("password", { required: isPassword, minLength: 4 })}
                                onChange={handleChange}
                                color={errors.password ? 'red' : "lightBlue"}
                                size="regular"
                                type="password"
                                outline={true}
                                placeholder="Kanal Şifresi"
                                iconFamily="material-icons"
                                iconName="lock"
                            />
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="red"
                        buttonType="link"
                        onClick={(e) => setShowModal(false)}
                        ripple="dark"
                    >
                        Cancel
                    </Button>

                    <Button
                        color="green"
                        onClick={() => handleSubmit(onSubmit)()}
                        ripple="light"
                    >
                        Create Channel
                    </Button>
                </ModalFooter>
            </Modal>
            }
        </>
    )
}

export default React.memo(CreateChannelForm)
