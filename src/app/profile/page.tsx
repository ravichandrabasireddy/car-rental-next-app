'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useSession } from 'next-auth/react'


type Address = {
    street: string
    city: string
    state: string
    zip: string
    country: string
}

type User = {
    name: string
    email: string
    role: string
    phoneNumber: string
    address: Address
}

export default function UserProfile() {
    const { data: session } = useSession();
    const [user, setUser] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        const fetchUserData = async () => {
            if (session?.user.id) {
                try {
                    const response = await fetch(process.env.NEXT_PUBLIC_RENTAL_API_URL + "/user/" + session.user.id, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${session.backend_tokens.access_token}`
                        }
                    });
                    if (!response.ok) {
                        throw new Error('Failed to fetch user data');
                    }
                    const userData = await response.json();
                    setUser(userData);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchUserData();
    }, [session]);

    const handleAddressChange = (field: keyof Address, value: string) => {
        setUser((prevUser) => {
            if (!prevUser) return null;
            return {
                ...prevUser,
                address: {
                    ...prevUser.address,
                    [field]: value
                }
            };
        });
    }

    const handlePhoneChange = (value: string) => {
        setUser((prevUser) => {
            if (!prevUser) return null;
            return {
                ...prevUser,
                phoneNumber: value
            };
        });
    }

    const handleSave = async () => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_RENTAL_API_URL + "/user/update/" + session?.user.id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.backend_tokens.access_token}`
                },
                body: JSON.stringify({
                    phoneNumber: user?.phoneNumber,
                    address: user?.address
                })
            });
            if (!response.ok) {
                throw new Error('Failed to update user data');
            }
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    }

    if (!user) {
        return <div className="flex items-center justify-center h-full">Loading...</div>;
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>User Profile</CardTitle>
                <CardDescription>View and edit your profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>Name</Label>
                    <div className="font-medium">{user.name}</div>
                </div>
                <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="font-medium">{user.email}</div>
                </div>
                <div className="space-y-2">
                    <Label>Role</Label>
                    <Badge variant="secondary">{user.role}</Badge>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                        id="phoneNumber"
                        value={user.phoneNumber || ''}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        disabled={!isEditing}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Address</Label>

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            placeholder="Street"
                            value={user.address?.street || ''}
                            onChange={(e) => handleAddressChange('street', e.target.value)}
                            disabled={!isEditing}
                        />
                        <Input
                            placeholder="City"
                            value={user.address?.city || ''}
                            onChange={(e) => handleAddressChange('city', e.target.value)}
                            disabled={!isEditing}
                        />
                        <Input
                            placeholder="State"
                            value={user.address?.state || ''}
                            onChange={(e) => handleAddressChange('state', e.target.value)}
                            disabled={!isEditing}
                        />
                        <Input
                            placeholder="ZIP"
                            value={user.address?.zip || ''}
                            onChange={(e) => handleAddressChange('zip', e.target.value)}
                            disabled={!isEditing}
                        />
                        <Input
                            placeholder="Country"
                            value={user.address?.country || ''}
                            onChange={(e) => handleAddressChange('country', e.target.value)}
                            disabled={!isEditing}
                        />
                    </div>

                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                {isEditing ? (
                    <>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                        <Button onClick={handleSave}>Save Changes</Button>
                    </>
                ) : (
                    <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                )}
            </CardFooter>
        </Card>
    )
}