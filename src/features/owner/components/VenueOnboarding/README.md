# Venue Onboarding Flow

A multi-step venue registration wizard that guides venue owners through setting up their sports facility on AthletiMatch.

## Structure

### Components

1. **VenueOnboarding.tsx** (Main Wrapper)
   - Manages step navigation
   - Stores onboarding data across all steps
   - Handles step progression and data persistence

2. **Step1VenueDetails.tsx**
   - Collect venue basic information (name, location, address)
   - Select amenities (parking, showers, cafeteria, WiFi)
   - Progress: 20%

3. **Step2AddCourts.tsx**
   - Add multiple courts/sports facilities
   - Set pricing, capacity, and operating hours
   - Edit/delete courts with modal interface
   - Progress: 40%

4. **Step3MediaUpload.tsx**
   - Drag & drop image upload per court
   - Support for up to 10 images per court
   - Image preview and removal
   - Progress: 60%

5. **Step4Verification.tsx**
   - Upload identity documents (Citizenship, PAN, Business Registration)
   - File validation and security notice
   - Progress: 80%

6. **Step5PreviewReview.tsx**
   - Review all entered information
   - Summary of completed setup
   - Final submission button
   - Progress: 100%

## Data Flow

```
MyVenues Component
    ↓
Click "Create Your First Venue"
    ↓
VenueOnboarding (Main Wrapper)
    ├── Step 1: Venue Details → VenueDetailsData
    ├── Step 2: Add Courts → CourtsData
    ├── Step 3: Media Upload → MediaData
    ├── Step 4: Verification → VerificationData
    └── Step 5: Preview & Submit → Complete
```

## Key Features

- **Progressive Enhancement**: Each step builds on the previous one
- **Data Persistence**: All data is stored in the parent component and passed down
- **Navigation**: Back/Next buttons with disabled states
- **Form Validation**: Required fields must be filled before proceeding
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Type Safety**: Full TypeScript support with interfaces for each step

## Usage

```tsx
import { VenueOnboarding } from '@/features/owner/components/VenueOnboarding';

export default function MyVenues() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  if (showOnboarding) {
    return <VenueOnboarding onClose={() => setShowOnboarding(false)} />;
  }

  return (
    <button onClick={() => setShowOnboarding(true)}>
      Create Venue
    </button>
  );
}
```

## Next Steps (API Integration)

- Connect Step 1 to backend for venue creation
- Connect Step 2 to add courts API
- Connect Step 3 to image upload service
- Connect Step 4 to document verification API
- Connect Step 5 to final submission endpoint
- Add success/error handling and notifications
- Add loading states during API calls

## Styling

- Built with Tailwind CSS
- Uses Material Symbols for icons
- Consistent color scheme with blue primary color (#2563eb)
- Smooth transitions and animations

## Browser Support

- Modern browsers with ES6+ support
- Requires React 18+
- Tailwind CSS configuration
