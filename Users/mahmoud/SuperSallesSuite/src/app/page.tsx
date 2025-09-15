'use client'
import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowUp, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { runFlow } from '@/lib/flows';
import { SearchResultsBriefing } from '@/components/search-results-briefing';
import Image from 'next/image';

function Scene({ isSearching }: { isSearching: boolean }) {
  const globeRef = useRef<THREE.Mesh>(null!);
  const { camera } = useThree();

  useFrame((state, delta) => {
    // Slow continuous rotation
    if (globeRef.current) {
        globeRef.current.rotation.y += delta * 0.05;
    }

    // THE DANCE: Animate camera zoom on search
    const targetZ = isSearching ? 12 : 7;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
    camera.lookAt(0,0,0);
  });

  const [colorMap] = useLoader(TextureLoader, [
    '/textures/earth_day.jpg',
  ]);

  return (
    <>
        <ambientLight intensity={0.3} />
        <pointLight color="white" position={[10, 10, 10]} intensity={2.5}/>
        <Stars radius={300} depth={50} count={20000} factor={7} saturation={0} fade speed={1} />
        <mesh ref={globeRef} scale={2.5}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial map={colorMap} metalness={0.4} roughness={0.7} />
        </mesh>
    </>
  );
}

function GenesisUI() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('q') || '';

    const [query, setQuery] = useState(initialQuery);
    const [hasSearched, setHasSearched] = useState(!!initialQuery);
    const [isLoading, setIsLoading] = useState(false);
    const [briefing, setBriefing] = useState<any>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedQuery = query.trim();
        if (!trimmedQuery) return;
        
        setIsLoading(true);
        setHasSearched(true);
        router.push(`/?q=${encodeURIComponent(trimmedQuery)}`, { scroll: false });
        
        runFlow('mainOrchestratorAgent', { command: trimmedQuery })
            .then(response => {
                if (response) {
                    setBriefing(response);
                } else {
                    setBriefing(null);
                }
            })
            .catch(err => {
                console.error(err);
                setBriefing(null);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        if(initialQuery && !briefing && !isLoading){
             handleSearch(new Event('submit') as unknown as React.FormEvent)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[initialQuery, briefing, isLoading])

    return (
        <div className="absolute inset-0 z-10 flex flex-col items-center text-white p-6">
            <motion.div 
                className="w-full"
                animate={{ y: hasSearched ? 24 : "calc(50vh - 12rem)" }}
                transition={{ duration: 0.8, type: 'spring', bounce: 0.2 }}
            >
                <AnimatePresence>
                {!hasSearched && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0}}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <div className="flex justify-center items-center mb-4">
                            <Image src="https://firebasestorage.googleapis.com/v0/b/supersellerae-4rzzy.firebasestorage.app/o/white%20logo%20of%20whatsmapp.png?alt=media&token=5218d2c8-7f98-4665-90d9-79653d11ecc7" alt="WhatsMAP Logo" width={80} height={80} />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold font-heading">WhatsMAP</h1>
                        <p className="text-xl text-muted-foreground mt-2">The World Spins Knowledge Into Place.</p>
                    </motion.div>
                )}
                </AnimatePresence>
                
                <motion.form 
                    onSubmit={handleSearch} 
                    className="relative w-full max-w-2xl mx-auto mt-8"
                    layout
                >
                    <div className="relative p-px rounded-xl bg-gradient-to-r from-primary/30 to-primary/50">
                        <Input
                            placeholder="Search Palm Jumeirah 2005, Emaar vs DAMAC, or ask any question..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full h-16 pl-6 pr-16 text-lg bg-black/70 border-2 border-gray-800 text-white rounded-[calc(0.75rem-1px)] shadow-lg placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <Button type="submit" variant="ghost" size="icon" className="text-neutral-300 hover:text-white h-12 w-12" disabled={isLoading}>
                                 {isLoading ? <Loader2 className="h-6 w-6 animate-spin"/> : <ArrowUp className="h-6 w-6" />}
                            </Button>
                        </div>
                    </div>
                </motion.form>
            </motion.div>

            <AnimatePresence>
                {hasSearched && (
                    <motion.div 
                        className="w-full max-w-5xl mt-8 overflow-y-auto"
                        initial={{ opacity: 0, y: 50}}
                        animate={{ opacity: 1, y: 0}}
                        transition={{ duration: 0.5, delay: 0.5}}
                        style={{ height: 'calc(100vh - 12rem)'}}
                    >
                       {isLoading && !briefing && <div className="text-center pt-20"><Loader2 className="h-8 w-8 animate-spin"/></div>}
                       {!isLoading && briefing && <SearchResultsBriefing briefing={briefing} />}
                       {!isLoading && !briefing && <p className="text-center pt-20 text-muted-foreground">No results for "{query}"</p>}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// The new Genesis Engine Homepage
export default function GenesisHomepage() {
    const searchParams = useSearchParams();
    const hasSearched = !!searchParams?.get('q');

    return (
        <div className="h-screen w-screen bg-black">
            <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
                <Suspense fallback={null}>
                    <Scene isSearching={hasSearched} />
                </Suspense>
            </Canvas>
            <Suspense fallback={null}>
                <GenesisUI />
            </Suspense>
        </div>
    );
}
