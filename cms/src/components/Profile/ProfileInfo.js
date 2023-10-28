// @ts-nocheck
import React from 'react';

export const ProfileInfo = (props) => {
    return (
        <>
            <div className='media'>
                <div className='media-body'>
                    <ul className='list-unstyled list-info'>
                        <div className="row">
                            <div className="col-9">
                                <li className='d-flex pt-2 pb-2 border-bottom'>
                                    <span className='d-flex align-items-center min-w-25'>
                                        <i className="eva eva-info mr-1"></i>
                                        Fullname
                                    </span>
                                    <span>
                                        {props.profileData?.name || ''}
                                    </span>
                                </li>
                                <li className='d-flex pt-2 pb-2 border-bottom'>
                                    <span className='d-flex align-items-center min-w-25'>
                                        <i className="eva eva-person mr-1"></i>
                                        Username
                                    </span>
                                    <span>
                                        {props.profileData?.username}
                                    </span>
                                </li>
                                <li className='d-flex pt-2 pb-2 border-bottom'>
                                    <span className='d-flex align-items-center min-w-25'>
                                        <i className="eva eva-email mr-1"></i>
                                        Email
                                    </span>
                                    <span>
                                        {props.profileData?.email || ''}
                                    </span>
                                </li>
                                <li className='d-flex pt-2 pb-2 border-bottom'>
                                    <span className='d-flex align-items-center min-w-25'>
                                        <i className="eva eva-star mr-1"></i>
                                        Gender
                                    </span>
                                    <span>
                                        {props.profileData?.gender || ''}
                                    </span>
                                </li>
                                <li className='d-flex pt-2 pb-2 border-bottom'>
                                    <span className='d-flex align-items-center min-w-25'>
                                        <i className="eva eva-calendar mr-1"></i>
                                        Birthday
                                    </span>
                                    <span>
                                        {props.profileData?.birthDay || ''}
                                    </span>
                                </li>
                                <li className='d-flex pt-2 pb-2 border-bottom'>
                                    <span className='d-flex align-items-center min-w-25'>
                                        <i className="eva eva-phone mr-1"></i>
                                        Phone
                                    </span>
                                    <span>
                                        {props.profileData?.phone || ''}
                                    </span>
                                </li>
                                <li className='d-flex pt-2 pb-2'>
                                    <span className='d-flex align-items-center min-w-25'>
                                        <i className="eva eva-map mr-1"></i>
                                        Address
                                    </span>
                                    <span>
                                        {props.profileData?.address || ''}
                                    </span>
                                </li>
                            </div>
                            <div className="col-3 text-center pt-4">
                                <img src={props.profileData?.avatar || "https://bathanh.com.vn/wp-content/uploads/2017/08/default_avatar.png"} width="100%" height="100%" style={{ maxWidth: 140, maxHeight: 140 }} />
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        </>
    )
}