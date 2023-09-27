import React from 'react';
import { PlatformsComponentProps } from '../../types/type';

const PlatformsComponent: React.FC<PlatformsComponentProps> = ({ platforms, noLinesAvailable, onPlatformClick }) => {
    return (
        <div className="platforms">

            <p className="platformList">
                {platforms.length > 0 ? (
                    platforms.map((platform: any) => (
                        <button
                            className="platformButton"
                            onClick={() => onPlatformClick(platform.id)}
                            key={platform.id}
                        >
                            {platform.name} {platform.public_code}
                        </button>
                    ))
                ) : (
                    <span className="noPlatforms">Ingen busstopp funnet</span>
                )}
                {noLinesAvailable && platforms.length > 0 && (
                    <p className="noLinesAvailable">Ingen linjer tilgjengelig</p>
                )}
            </p>
        </div>
    );
};

export default PlatformsComponent;
