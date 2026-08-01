# TheMoneytizer Ad Management System

## Overview

This LMS platform now includes a fully dynamic TheMoneytizer ad management system that can be completely controlled from the Admin Panel.

## Features

✅ **Dynamic Ad Zones** - Create and manage multiple ad placements  
✅ **Position-Based Targeting** - Header, Sidebar, Footer, Content, Between Courses/Tutorials  
✅ **Page-Type Filtering** - Show ads on specific pages (Home, Courses, Tutorials, etc.)  
✅ **Real-Time Analytics** - Track impressions, clicks, CTR, and revenue  
✅ **Priority System** - Control which ads display first  
✅ **GDPR Compliance** - Built-in consent management  
✅ **Custom Code Support** - Use custom HTML/JS if needed  
✅ **Caching** - 5-minute cache for optimal performance  

## Setup Instructions

### 1. Database Migration

The migration has already been created and run. Tables include:
- `ad_zones` - Ad placement configurations
- `ad_settings` - Global settings (Publisher ID, API keys)
- `ad_impressions` - Performance tracking data

### 2. Seed Default Data

Default ad zones have been created via seeder:
```bash
php artisan db:seed --class=AdZoneSeeder
```

### 3. Configure TheMoneytizer Publisher ID

1. Login to Admin Panel
2. Navigate to **Admin > Ads**
3. Update the **Publisher ID** in Global Settings
4. Enable/Disable ads as needed

### 4. Create Ad Zones in TheMoneytizer

1. Login to [TheMoneytizer Dashboard](https://www.themoneytizer.com/)
2. Create ad zones for each position you want
3. Copy the Zone IDs
4. Add them in Admin Panel with matching positions

## Admin Panel Usage

### Managing Ad Zones

**Location:** `/admin/ads`

**Actions Available:**
- ➕ **Create New Zone** - Add new ad placements
- ✏️ **Edit Zone** - Modify existing configurations
- 🗑️ **Delete Zone** - Remove ad zones
- 🔄 **Toggle Active** - Enable/disable without deleting
- 📊 **View Analytics** - See performance metrics

### Creating a New Ad Zone

1. Click **"New Ad Zone"** button
2. Fill in the form:
   - **Name**: Descriptive name (e.g., "Homepage Header Banner")
   - **Zone ID**: From TheMoneytizer dashboard
   - **Position**: Where to display (header, sidebar, footer, etc.)
   - **Page Type**: Which pages to show on
   - **Ad Type**: banner, native, video, or popup
   - **Dimensions**: Width & Height (optional)
   - **Priority**: Higher numbers show first
   - **Status**: Active/Inactive

### Viewing Analytics

**Location:** `/admin/ads/analytics`

**Metrics Tracked:**
- Total Impressions
- Total Clicks
- Click-Through Rate (CTR)
- Estimated Revenue
- Date Range Filtering

## Frontend Integration

Ads are automatically displayed on pages where you've configured zones:

### Current Integrations:
- ✅ **Courses Page** (`/courses`)
  - Header ads
  - Between-courses ads (after every 3rd course)
  
### To Add More Pages:

1. Update the controller to pass ad data:
```php
$ads = \App\Services\AdService::getHeaderAds('page_type');
return Inertia::render('Page', ['ads' => $ads]);
```

2. Add AdZone component in Vue template:
```vue
<AdZone 
    v-for="ad in ads.header" 
    :key="ad.id"
    :zone-id="ad.zone_id"
    :position="ad.position"
    :ad-code="ad.ad_code"
/>
```

## Ad Positions Explained

| Position | Description | Best For |
|----------|-------------|----------|
| `header` | Top of page | Large banners (728x90, 970x90) |
| `sidebar` | Side column | Medium rectangles (300x250) |
| `footer` | Bottom of page | Wide banners (970x90) |
| `content` | Within content | Native ads, inline banners |
| `between_courses` | Between course cards | Native ads, responsive units |
| `between_tutorials` | Between tutorial cards | Native ads, responsive units |

## Page Types

| Page Type | Route | Description |
|-----------|-------|-------------|
| `all` | * | All pages |
| `home` | `/` | Homepage |
| `courses` | `/courses` | Course archive |
| `tutorials` | `/tutorials` | Tutorial archive |
| `course_detail` | `/courses/{slug}` | Individual course |
| `tutorial_detail` | `/tutorials/{slug}` | Individual tutorial |

## Performance Optimization

### Caching Strategy
- Ad configurations cached for **5 minutes**
- Cache cleared when:
  - Ad zone is created/updated/deleted
  - Settings are changed
  - Toggle active status

### Lazy Loading
- Ads load asynchronously
- Won't block page rendering
- Loading placeholder shown while fetching

## GDPR Compliance

To enable GDPR compliance:

1. Go to **Admin > Ads**
2. Set **GDPR Compliance** to **Enabled**
3. Add consent banner to your site
4. Only load ads after user consent

## Troubleshooting

### Ads Not Showing

1. ✅ Check if ads are enabled in Global Settings
2. ✅ Verify Publisher ID is set correctly
3. ✅ Ensure ad zone is **Active**
4. ✅ Confirm Zone ID matches TheMoneytizer
5. ✅ Clear cache: `php artisan cache:clear`

### Low CTR

1. Try different ad positions
2. Test different ad sizes
3. Use native ads for better integration
4. Adjust priority to show better-performing ads first

### Tracking Issues

Check browser console for errors in `/api/ads/track` endpoint.

## API Endpoints

### Track Impression/Click
```
POST /api/ads/track
Content-Type: application/json

{
    "zone_id": "your_zone_id",
    "type": "impression", // or "click"
    "page_url": "https://yoursite.com/page",
    "revenue": 0.001 // optional
}
```

## Security

- ✅ CSRF protection on all endpoints
- ✅ Admin-only access (requires `manage-ads` permission)
- ✅ Input validation on all forms
- ✅ SQL injection prevention via Eloquent ORM

## Future Enhancements

Potential improvements:
- [ ] A/B testing for ad placements
- [ ] Auto-optimization based on CTR
- [ ] Multi-network support (AdSense, etc.)
- [ ] Advanced targeting (user roles, demographics)
- [ ] Real-time revenue dashboard
- [ ] Export analytics to CSV/PDF
- [ ] Ad rotation scheduling
- [ ] Geo-targeting support

## Support

For TheMoneytizer-specific issues:
- Website: https://www.themoneytizer.com/
- Support: support@themoneytizer.com

For platform integration issues:
- Check Laravel logs: `storage/logs/laravel.log`
- Review Vue console errors
- Verify database migrations ran successfully

---

**Version:** 1.0.0  
**Last Updated:** August 1, 2026
