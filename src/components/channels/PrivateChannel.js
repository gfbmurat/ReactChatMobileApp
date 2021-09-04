import React, { useState } from 'react'
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import InputIcon from '@material-tailwind/react/InputIcon'
import channelActions from '../../redux/actions/channelActions'
import { useWindowWidth } from '@react-hook/window-size';
import { useDispatch } from 'react-redux';

const PrivateChannel = ({ showParolaModal, setShowParolaModal, channel }) => {

    const windowSize = useWindowWidth()
    const dispatch = useDispatch()
    const [inputPassword, setInputPassword] = useState("");

    const handleInput = (e) => {
        setInputPassword(e.target.value);
        console.warn(channel.channelPassword)
        if (e.target.value === channel.channelPassword) {
            setInputPassword("");
            dispatch(channelActions.setCurrentChannel(channel))
        } else {
            setShowParolaModal(false)
        }
    };

    return (
        <>
            <Modal size={windowSize > 480 ? 'md' : 'sm'} active={showParolaModal} toggler={() => setShowParolaModal(false)}>
                <ModalHeader toggler={() => setShowParolaModal(false)}>
                    Şifreli Kanal
                </ModalHeader>
                <ModalBody>
                    <p className="text-base leading-relaxed text-gray-600 font-normal mb-4">
                        Şifreli Kanal Girmek İçin Şifreyi Giriniz!
                    </p>
                    <form>
                        <div className={`mb-4`}>
                            <InputIcon
                                value={inputPassword}
                                onChange={handleInput}
                                name="password"
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
            </Modal>
        </>
    )
}

export default PrivateChannel
