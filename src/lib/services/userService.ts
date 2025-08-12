export const deleteUserAccount = async () => {
  try {
    const response = await fetch('/api/user/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ confirmed: true }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete account');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting account:', error);
    throw error;
  }
};
