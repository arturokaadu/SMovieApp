import React, { useState } from 'react';
import { getSpotifyEmbedUrl, openSpotifySearch, openYouTubeSearch } from '../../services/spotifyService';

export const Soundtracks = ({ animeTitle, themes }) => {
    // In a real app with a backend, we would fetch the specific Spotify Album ID for this anime.
    // For now, we'll allow users to search or show a placeholder if we don't have the ID.
    // We can also use the 'themes' prop from Jikan API (openings/endings) to show YouTube searches.

    const [spotifyId] = useState(null); // This would come from Firestore/Database

    const hasThemes = themes && (themes.openings?.length > 0 || themes.endings?.length > 0);

    if (!hasThemes && !spotifyId) return null;

    return (
        <div className="mt-5">
            <h3 className="mb-4 border-bottom pb-2 text-white">
                <i className="bi bi-music-note-beamed me-2 text-success"></i>
                Soundtracks & Themes
            </h3>

            <div className="row">
                {/* Spotify Section */}
                <div className="col-md-6 mb-4">
                    <div className="card glass-card h-100 p-3">
                        <h5 className="card-title text-white mb-3">
                            <i className="bi bi-spotify me-2 text-success"></i>
                            Official OST
                        </h5>

                        {spotifyId ? (
                            <iframe
                                style={{ borderRadius: '12px' }}
                                src={getSpotifyEmbedUrl('album', spotifyId)}
                                width="100%"
                                height="352"
                                frameBorder="0"
                                allowFullScreen=""
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                                title="Spotify Embed"
                            ></iframe>
                        ) : (
                            <div className="text-center py-5 text-muted">
                                <i className="bi bi-music-note-list display-4 mb-3 d-block"></i>
                                <p>Official soundtrack album not linked yet.</p>
                                <button
                                    className="btn btn-outline-success btn-sm mt-2"
                                    onClick={() => openSpotifySearch(animeTitle)}
                                >
                                    <i className="bi bi-search me-1"></i> Search on Spotify
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* YouTube Themes Section */}
                <div className="col-md-6 mb-4">
                    <div className="card glass-card h-100 p-3">
                        <h5 className="card-title text-white mb-3">
                            <i className="bi bi-youtube me-2 text-danger"></i>
                            Openings & Endings
                        </h5>

                        <div className="themes-list" style={{ maxHeight: '352px', overflowY: 'auto' }}>
                            {themes && (themes.openings?.length > 0 || themes.endings?.length > 0) ? (
                                <ul className="list-group list-group-flush bg-transparent">
                                    {themes.openings?.map((op, index) => (
                                        <li key={`op-${index}`} className="list-group-item bg-transparent text-white border-secondary d-flex justify-content-between align-items-center">
                                            <div>
                                                <span className="badge bg-primary me-2">OP {index + 1}</span>
                                                <small>{op}</small>
                                            </div>
                                            <button
                                                className="btn btn-sm btn-outline-danger ms-2"
                                                onClick={() => openYouTubeSearch(op)}
                                                title="Search on YouTube"
                                            >
                                                <i className="bi bi-play-fill"></i>
                                            </button>
                                        </li>
                                    ))}
                                    {themes.endings?.map((ed, index) => (
                                        <li key={`ed-${index}`} className="list-group-item bg-transparent text-white border-secondary d-flex justify-content-between align-items-center">
                                            <div>
                                                <span className="badge bg-secondary me-2">ED {index + 1}</span>
                                                <small>{ed}</small>
                                            </div>
                                            <button
                                                className="btn btn-sm btn-outline-danger ms-2"
                                                onClick={() => openYouTubeSearch(ed)}
                                                title="Search on YouTube"
                                            >
                                                <i className="bi bi-play-fill"></i>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="text-center py-5 text-muted">
                                    <p>No theme songs information available.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
